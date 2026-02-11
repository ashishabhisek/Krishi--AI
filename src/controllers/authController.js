const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP, sendOTP } = require('../utils/otp');
const { sendVerificationEmail } = require('../utils/email');

const sendOTPHandler = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Check if user exists
    const result = await pool.query('SELECT id FROM users WHERE phone_number = $1', [phoneNumber]);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (result.rows.length > 0) {
      // User exists, update OTP
      await pool.query(
        'UPDATE users SET otp = $1, otp_expiry = $2 WHERE phone_number = $3',
        [otp, otpExpiry, phoneNumber]
      );
    } else {
      // Create new user with OTP
      await pool.query(
        'INSERT INTO users (phone_number, otp, otp_expiry, role) VALUES ($1, $2, $3, $4)',
        [phoneNumber, otp, otpExpiry, 'farmer']
      );
    }

    // Send OTP via SMS
    const smsResult = await sendOTP(phoneNumber, otp);

    if (smsResult.success) {
      return res.status(200).json({
        message: 'OTP sent successfully',
        phoneNumber,
      });
    } else {
      return res.status(500).json({
        message: 'Failed to send OTP',
        error: smsResult.error,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error sending OTP', error: err.message });
  }
};

const verifyOTPHandler = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    const result = await pool.query(
      'SELECT id, otp, otp_expiry, is_verified FROM users WHERE phone_number = $1',
      [phoneNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check OTP expiry
    if (new Date() > user.otp_expiry) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Update user
    await pool.query(
      'UPDATE users SET is_verified = TRUE, otp = NULL, otp_expiry = NULL WHERE id = $1',
      [user.id]
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, phoneNumber, role: 'farmer' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, phoneNumber },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
};

const registerHandler = async (req, res) => {
  try {
    const { phoneNumber, email, firstName, lastName, password, state, district, village } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Phone number and password are required' });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE phone_number = $1 OR email = $2',
      [phoneNumber, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists with this phone number or email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (phone_number, email, password_hash, first_name, last_name, state, district, village, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [phoneNumber, email, hashedPassword, firstName, lastName, state, district, village, 'farmer']
    );

    // Create notification preferences
    await pool.query(
      'INSERT INTO notification_preferences (user_id) VALUES ($1)',
      [result.rows[0].id]
    );

    return res.status(201).json({
      message: 'User registered successfully',
      userId: result.rows[0].id,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Phone number and password are required' });
    }

    const result = await pool.query(
      'SELECT id, password_hash, role FROM users WHERE phone_number = $1',
      [phoneNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, phoneNumber, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, phoneNumber, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

const logoutHandler = (req, res) => {
  // JWT is stateless, so logout is handled on the client side
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
  sendOTPHandler,
  verifyOTPHandler,
  registerHandler,
  loginHandler,
  logoutHandler,
};
