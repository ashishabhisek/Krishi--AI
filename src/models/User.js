const pool = require('../config/database');

const User = {
  findById: async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  findByPhoneNumber: async (phoneNumber) => {
    const result = await pool.query('SELECT * FROM users WHERE phone_number = $1', [phoneNumber]);
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  create: async (userData) => {
    const { phoneNumber, email, passwordHash, firstName, lastName, state, district, village, role } = userData;
    const result = await pool.query(
      `INSERT INTO users (phone_number, email, password_hash, first_name, last_name, state, district, village, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [phoneNumber, email, passwordHash, firstName, lastName, state, district, village, role || 'farmer']
    );
    return result.rows[0];
  },

  update: async (id, data) => {
    const { firstName, lastName, email, state, district, village, farmSize, crops, preferredLanguage } = data;
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
      [firstName, lastName, email, state, district, village, farmSize, crops, preferredLanguage, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  },
};

module.exports = User;
