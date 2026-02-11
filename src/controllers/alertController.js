const pool = require('../config/database');

const createAlert = async (req, res) => {
  try {
    const { title, description, alertType, severity, region, affectedCrops, recommendations } = req.body;
    const adminId = req.user.id;

    if (!title || !alertType || !severity) {
      return res.status(400).json({ message: 'Title, alert type, and severity are required' });
    }

    const result = await pool.query(
      `INSERT INTO alerts (title, description, alert_type, severity, region, affected_crops, recommendations, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, alertType, severity, region, affectedCrops, recommendations, adminId]
    );

    // Notify all users in the region
    const usersToNotify = await pool.query(
      `SELECT id FROM users WHERE state = $1 AND role = 'farmer'`,
      [region]
    );

    for (const user of usersToNotify.rows) {
      await pool.query(
        `INSERT INTO notifications (user_id, title, description, type, priority)
         VALUES ($1, $2, $3, $4, $5)`,
        [user.id, title, description, alertType, severity]
      );
    }

    return res.status(201).json({
      message: 'Alert created successfully',
      alert: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating alert', error: err.message });
  }
};

const getAlerts = async (req, res) => {
  try {
    const { alertType, region, severity, page = 1, limit = 10 } = req.query;

    let query = 'SELECT * FROM alerts WHERE is_active = TRUE';
    const params = [];

    if (alertType) {
      query += ` AND alert_type = $${params.length + 1}`;
      params.push(alertType);
    }

    if (region) {
      query += ` AND (region = $${params.length + 1} OR region IS NULL)`;
      params.push(region);
    }

    if (severity) {
      query += ` AND severity = $${params.length + 1}`;
      params.push(severity);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, (page - 1) * limit);

    const result = await pool.query(query, params);

    return res.status(200).json({
      alerts: result.rows,
      total: result.rowCount,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching alerts', error: err.message });
  }
};

const getAlertById = async (req, res) => {
  try {
    const { alertId } = req.params;

    const result = await pool.query(
      'SELECT * FROM alerts WHERE id = $1',
      [alertId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching alert', error: err.message });
  }
};

const updateAlert = async (req, res) => {
  try {
    const { alertId } = req.params;
    const { title, description, severity, region, affectedCrops, recommendations, isActive } = req.body;

    const result = await pool.query(
      `UPDATE alerts 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           severity = COALESCE($3, severity),
           region = COALESCE($4, region),
           affected_crops = COALESCE($5, affected_crops),
           recommendations = COALESCE($6, recommendations),
           is_active = COALESCE($7, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [title, description, severity, region, affectedCrops, recommendations, isActive, alertId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    return res.status(200).json({
      message: 'Alert updated successfully',
      alert: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating alert', error: err.message });
  }
};

const deleteAlert = async (req, res) => {
  try {
    const { alertId } = req.params;

    const result = await pool.query(
      'DELETE FROM alerts WHERE id = $1 RETURNING id',
      [alertId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    return res.status(200).json({ message: 'Alert deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting alert', error: err.message });
  }
};

module.exports = {
  createAlert,
  getAlerts,
  getAlertById,
  updateAlert,
  deleteAlert,
};
