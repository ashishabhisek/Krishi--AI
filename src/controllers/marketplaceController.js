const pool = require('../config/database');

const createProduct = async (req, res) => {
  try {
    const { productName, description, category, price, quantity, unit, location } = req.body;
    const sellerId = req.user.id;

    if (!productName || !price || !quantity) {
      return res.status(400).json({ message: 'Product name, price, and quantity are required' });
    }

    const result = await pool.query(
      `INSERT INTO marketplace_products (seller_id, product_name, description, category, price, quantity, unit, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [sellerId, productName, description, category, price, quantity, unit, location]
    );

    return res.status(201).json({
      message: 'Product listed successfully',
      product: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { category, search, sortBy = 'created_at', page = 1, limit = 12 } = req.query;

    let query = `SELECT mp.*, u.first_name as seller_name, u.phone_number 
                 FROM marketplace_products mp 
                 JOIN users u ON mp.seller_id = u.id 
                 WHERE mp.is_available = TRUE`;
    const params = [];

    if (category) {
      query += ` AND mp.category ILIKE $${params.length + 1}`;
      params.push(`%${category}%`);
    }

    if (search) {
      query += ` AND (mp.product_name ILIKE $${params.length + 1} OR mp.description ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY mp.${sortBy} DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, (page - 1) * limit);

    const result = await pool.query(query, params);

    return res.status(200).json({
      products: result.rows,
      total: result.rowCount,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await pool.query(
      `SELECT mp.*, u.first_name as seller_name, u.phone_number, u.state, u.district
       FROM marketplace_products mp 
       JOIN users u ON mp.seller_id = u.id 
       WHERE mp.id = $1`,
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, description, price, quantity, is_available } = req.body;
    const sellerId = req.user.id;

    const result = await pool.query(
      `UPDATE marketplace_products 
       SET product_name = COALESCE($1, product_name),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           quantity = COALESCE($4, quantity),
           is_available = COALESCE($5, is_available),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 AND seller_id = $7 RETURNING *`,
      [productName, description, price, quantity, is_available, productId, sellerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found or not owned by you' });
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      product: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const sellerId = req.user.id;

    const result = await pool.query(
      'DELETE FROM marketplace_products WHERE id = $1 AND seller_id = $2 RETURNING id',
      [productId, sellerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found or not owned by you' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const result = await pool.query(
      `SELECT * FROM marketplace_products 
       WHERE seller_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET $3`,
      [sellerId, limit, (page - 1) * limit]
    );

    return res.status(200).json({
      products: result.rows,
      total: result.rowCount,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching your products', error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
};
