const pool = require('../config/database');
const { sendQueryResponseEmail } = require('../utils/email');

const submitQuery = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const userId = req.user.id;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const result = await pool.query(
      `INSERT INTO queries (user_id, title, description, category, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, title, description, category || 'General', 'open']
    );

    // Create notification for admins
    await pool.query(
      `INSERT INTO notifications (user_id, title, description, type, related_id, related_type)
       SELECT id, $1, $2, $3, $4, $5 FROM users WHERE role = 'admin'`,
      ['New Query Submitted', `${title} by farmer`, 'new_query', result.rows[0].id, 'query']
    );

    return res.status(201).json({
      message: 'Query submitted successfully',
      query: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error submitting query', error: err.message });
  }
};

const getMyQueries = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    let query = 'SELECT * FROM queries WHERE user_id = $1';
    const params = [userId];

    if (status) {
      query += ' AND status = $2';
      params.push(status);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, (page - 1) * limit);

    const result = await pool.query(query, params);

    return res.status(200).json({
      queries: result.rows,
      total: result.rowCount,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching queries', error: err.message });
  }
};

const getQueryById = async (req, res) => {
  try {
    const { queryId } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT * FROM queries WHERE id = $1 AND user_id = $2',
      [queryId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Query not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching query', error: err.message });
  }
};

const rateQuery = async (req, res) => {
  try {
    const { queryId } = req.params;
    const { rating, feedback } = req.body;
    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const result = await pool.query(
      'UPDATE queries SET rating = $1, feedback = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [rating, feedback, queryId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Query not found' });
    }

    return res.status(200).json({
      message: 'Rating submitted successfully',
      query: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error rating query', error: err.message });
  }
};

// Admin only
const getAllQueries = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let query = 'SELECT q.*, u.first_name, u.phone_number FROM queries q JOIN users u ON q.user_id = u.id';
    const params = [];

    if (status) {
      query += ' WHERE q.status = $1';
      params.push(status);
    }

    query += ` ORDER BY q.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, (page - 1) * limit);

    const result = await pool.query(query, params);

    return res.status(200).json({
      queries: result.rows,
      total: result.rowCount,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching queries', error: err.message });
  }
};

const respondToQuery = async (req, res) => {
  try {
    const { queryId } = req.params;
    const { response, status } = req.body;
    const adminId = req.user.id;

    if (!response) {
      return res.status(400).json({ message: 'Response is required' });
    }

    const result = await pool.query(
      `UPDATE queries 
       SET expert_response = $1, expert_id = $2, status = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4 RETURNING *`,
      [response, adminId, status || 'answered', queryId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Query not found' });
    }

    const query = result.rows[0];

    // Send email notification to farmer
    const userResult = await pool.query(
      'SELECT email, first_name FROM users WHERE id = $1',
      [query.user_id]
    );

    if (userResult.rows[0].email) {
      await sendQueryResponseEmail(
        userResult.rows[0].email,
        userResult.rows[0].first_name,
        query.title,
        response
      );
    }

    // Create notification
    await pool.query(
      `INSERT INTO notifications (user_id, title, description, type, related_id, related_type)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [query.user_id, 'Your Query Has Been Answered', query.title, 'query_response', queryId, 'query']
    );

    return res.status(200).json({
      message: 'Response sent successfully',
      query: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error responding to query', error: err.message });
  }
};

module.exports = {
  submitQuery,
  getMyQueries,
  getQueryById,
  rateQuery,
  getAllQueries,
  respondToQuery,
};
