const pool = require('../config/database');

const submitFeedback = async (req, res) => {
  try {
    const { subject, message, rating, category } = req.body;
    const userId = req.user.id;

    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }

    const result = await pool.query(
      `INSERT INTO feedback (user_id, subject, message, rating, category, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, subject, message, rating, category, 'pending']
    );

    return res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error submitting feedback', error: err.message });
  }
};

const getMyFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const result = await pool.query(
      `SELECT * FROM feedback WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
      [userId, limit, (page - 1) * limit]
    );

    return res.status(200).json({
      feedback: result.rows,
      total: result.rowCount,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching feedback', error: err.message });
  }
};

// Admin only
const getAllFeedback = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let query = 'SELECT f.*, u.first_name, u.phone_number FROM feedback f JOIN users u ON f.user_id = u.id';
    const params = [];

    if (status) {
      query += ` WHERE f.status = $1`;
      params.push(status);
    }

    query += ` ORDER BY f.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, (page - 1) * limit);

    const result = await pool.query(query, params);

    return res.status(200).json({
      feedback: result.rows,
      total: result.rowCount,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching feedback', error: err.message });
  }
};

const respondToFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { response, status } = req.body;

    if (!response) {
      return res.status(400).json({ message: 'Response is required' });
    }

    const result = await pool.query(
      `UPDATE feedback SET response = $1, status = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
      [response, status || 'responded', feedbackId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    return res.status(200).json({
      message: 'Response sent successfully',
      feedback: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error responding to feedback', error: err.message });
  }
};

module.exports = {
  submitFeedback,
  getMyFeedback,
  getAllFeedback,
  respondToFeedback,
};
