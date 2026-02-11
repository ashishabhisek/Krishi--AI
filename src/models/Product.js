const pool = require('../config/database');

const Product = {
  create: async (productData) => {
    const { sellerId, productName, description, category, price, quantity, unit, location } = productData;
    const result = await pool.query(
      `INSERT INTO marketplace_products (seller_id, product_name, description, category, price, quantity, unit, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [sellerId, productName, description, category, price, quantity, unit, location]
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await pool.query(
      `SELECT mp.*, u.first_name as seller_name, u.phone_number, u.state, u.district
       FROM marketplace_products mp 
       JOIN users u ON mp.seller_id = u.id 
       WHERE mp.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  findAll: async (filters = {}) => {
    let query = `SELECT mp.*, u.first_name as seller_name, u.phone_number 
                 FROM marketplace_products mp 
                 JOIN users u ON mp.seller_id = u.id 
                 WHERE mp.is_available = TRUE`;
    const params = [];

    if (filters.category) {
      query += ` AND mp.category ILIKE $${params.length + 1}`;
      params.push(`%${filters.category}%`);
    }

    if (filters.search) {
      query += ` AND (mp.product_name ILIKE $${params.length + 1} OR mp.description ILIKE $${params.length + 1})`;
      params.push(`%${filters.search}%`);
    }

    query += ` ORDER BY mp.created_at DESC`;

    const result = await pool.query(query, params);
    return result.rows;
  },

  update: async (id, sellerId, data) => {
    const { productName, description, price, quantity, isAvailable } = data;
    const result = await pool.query(
      `UPDATE marketplace_products 
       SET product_name = COALESCE($1, product_name),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           quantity = COALESCE($4, quantity),
           is_available = COALESCE($5, is_available),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 AND seller_id = $7 RETURNING *`,
      [productName, description, price, quantity, isAvailable, id, sellerId]
    );
    return result.rows[0];
  },

  delete: async (id, sellerId) => {
    const result = await pool.query(
      'DELETE FROM marketplace_products WHERE id = $1 AND seller_id = $2 RETURNING id',
      [id, sellerId]
    );
    return result.rows[0];
  },

  findByUserId: async (sellerId) => {
    const result = await pool.query(
      `SELECT * FROM marketplace_products 
       WHERE seller_id = $1 
       ORDER BY created_at DESC`,
      [sellerId]
    );
    return result.rows;
  },
};

module.exports = Product;
