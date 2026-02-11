const { body, validationResult } = require('express-validator');

const validateAuth = {
  sendOTP: [
    body('phoneNumber')
      .trim()
      .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
      .withMessage('Invalid phone number format'),
  ],

  verifyOTP: [
    body('phoneNumber')
      .trim()
      .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
      .withMessage('Invalid phone number format'),
    body('otp')
      .trim()
      .isLength({ min: 6, max: 6 })
      .withMessage('OTP must be 6 digits'),
  ],

  register: [
    body('phoneNumber')
      .trim()
      .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
      .withMessage('Invalid phone number format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('email')
      .if((value) => value !== undefined)
      .isEmail()
      .withMessage('Invalid email format'),
  ],

  login: [
    body('phoneNumber')
      .trim()
      .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
      .withMessage('Invalid phone number format'),
    body('password')
      .isLength({ min: 1 })
      .withMessage('Password is required'),
  ],
};

const validateQuery = {
  submit: [
    body('title')
      .trim()
      .isLength({ min: 5, max: 255 })
      .withMessage('Title must be between 5 and 255 characters'),
    body('description')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters'),
  ],

  rate: [
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
  ],
};

const validateProduct = {
  create: [
    body('productName')
      .trim()
      .isLength({ min: 3, max: 255 })
      .withMessage('Product name must be between 3 and 255 characters'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be a positive integer'),
  ],
};

const validateFeedback = {
  submit: [
    body('subject')
      .trim()
      .isLength({ min: 3, max: 255 })
      .withMessage('Subject must be between 3 and 255 characters'),
    body('message')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Message must be at least 10 characters'),
    body('rating')
      .if((value) => value !== undefined)
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
  ],
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation error',
      errors: errors.array().map((err) => ({ field: err.param, message: err.msg })),
    });
  }
  next();
};

module.exports = {
  validateAuth,
  validateQuery,
  validateProduct,
  validateFeedback,
  handleValidationErrors,
};
