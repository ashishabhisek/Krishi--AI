const pool = require('../config/database');

const Query = {
  create: async (queryData) => {
    const { userId, title, description, category } = queryData;
    const result = await pool.query(
      `INSERT INTO queries (user_id, title, description, category, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, title, description, category || 'General', 'open']
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await pool.query('SELECT * FROM queries WHERE id = $1', [id]);
    return result.rows[0];
  },

  findByUserId: async (userId, filters = {}) => {
    let query = 'SELECT * FROM queries WHERE user_id = $1';
    const params = [userId];

    if (filters.status) {
      query += ` AND status = $${params.length + 1}`;
      params.push(filters.status);
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, params);
    return result.rows;
  },

  update: async (id, data) => {
    const { expertId, expertResponse, status, rating, feedback } = data;
    const result = await pool.query(
      `UPDATE queries 
       SET expert_id = COALESCE($1, expert_id),
           expert_response = COALESCE($2, expert_response),
           status = COALESCE($3, status),
           rating = COALESCE($4, rating),
           feedback = COALESCE($5, feedback),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [expertId, expertResponse, status, rating, feedback, id]
    );
    return result.rows[0];
  },
};

module.exports = Query;
