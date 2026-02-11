const pool = require('../config/database');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT id, phone_number, email, first_name, last_name, profile_photo_url, 
              state, district, village, farm_size, crops, preferred_language, created_at
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email, state, district, village, farmSize, crops, preferredLanguage } = req.body;

    const result = await pool.query(
      `UPDATE users 
       SET first_name = COALESCE($1, first_name),
           last_name = COALESCE($2, last_name),
           email = COALESCE($3, email),
           state = COALESCE($4, state),
           district = COALESCE($5, district),
           village = COALESCE($6, village),
           farm_size = COALESCE($7, farm_size),
           crops = COALESCE($8, crops),
           preferred_language = COALESCE($9, preferred_language),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $10 RETURNING *`,
      [firstName, lastName, email, state, district, village, farmSize, crops, preferredLanguage, userId]
    );

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

const getNotificationPreferences = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT * FROM notification_preferences WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Preferences not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching preferences', error: err.message });
  }
};

const updateNotificationPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      weatherAlerts,
      pestAlerts,
      schemeAlerts,
      queryUpdates,
      marketplaceUpdates,
      emailNotifications,
      smsNotifications,
    } = req.body;

    const result = await pool.query(
      `UPDATE notification_preferences 
       SET weather_alerts = COALESCE($1, weather_alerts),
           pest_alerts = COALESCE($2, pest_alerts),
           scheme_alerts = COALESCE($3, scheme_alerts),
           query_updates = COALESCE($4, query_updates),
           marketplace_updates = COALESCE($5, marketplace_updates),
           email_notifications = COALESCE($6, email_notifications),
           sms_notifications = COALESCE($7, sms_notifications),
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $8 RETURNING *`,
      [
        weatherAlerts,
        pestAlerts,
        schemeAlerts,
        queryUpdates,
        marketplaceUpdates,
        emailNotifications,
        smsNotifications,
        userId,
      ]
    );

    return res.status(200).json({
      message: 'Preferences updated successfully',
      preferences: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating preferences', error: err.message });
  }
};

const getMyNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, unreadOnly = false } = req.query;

    let query = 'SELECT * FROM notifications WHERE user_id = $1';
    const params = [userId];

    if (unreadOnly === 'true') {
      query += ' AND is_read = FALSE';
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, (page - 1) * limit);

    const result = await pool.query(query, params);

    return res.status(200).json({
      notifications: result.rows,
      total: result.rowCount,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      'UPDATE notifications SET is_read = TRUE WHERE id = $1 AND user_id = $2 RETURNING *',
      [notificationId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    return res.status(200).json({
      message: 'Notification marked as read',
      notification: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating notification', error: err.message });
  }
};

const saveTip = async (req, res) => {
  try {
    const userId = req.user.id;
    const { articleId } = req.body;

    if (!articleId) {
      return res.status(400).json({ message: 'Article ID is required' });
    }

    // Check if already saved
    const existing = await pool.query(
      'SELECT id FROM saved_tips WHERE user_id = $1 AND article_id = $2',
      [userId, articleId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Article already saved' });
    }

    const result = await pool.query(
      'INSERT INTO saved_tips (user_id, article_id) VALUES ($1, $2) RETURNING *',
      [userId, articleId]
    );

    return res.status(201).json({
      message: 'Tip saved successfully',
      savedTip: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error saving tip', error: err.message });
  }
};

const getSavedTips = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const result = await pool.query(
      `SELECT ka.* FROM knowledge_articles ka
       JOIN saved_tips st ON ka.id = st.article_id
       WHERE st.user_id = $1
       ORDER BY st.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, (page - 1) * limit]
    );

    return res.status(200).json({
      savedTips: result.rows,
      total: result.rowCount,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching saved tips', error: err.message });
  }
};

const removeSavedTip = async (req, res) => {
  try {
    const userId = req.user.id;
    const { articleId } = req.params;

    const result = await pool.query(
      'DELETE FROM saved_tips WHERE user_id = $1 AND article_id = $2 RETURNING id',
      [userId, articleId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Saved tip not found' });
    }

    return res.status(200).json({ message: 'Saved tip removed' });
  } catch (err) {
    return res.status(500).json({ message: 'Error removing saved tip', error: err.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getNotificationPreferences,
  updateNotificationPreferences,
  getMyNotifications,
  markNotificationAsRead,
  saveTip,
  getSavedTips,
  removeSavedTip,
};
