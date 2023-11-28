// controllers/productController.js
const db = require('../config/db');

exports.getProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
};

exports.getProduct = async (req, res) => {
  try {
    const [product] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (product.length === 0) {
      res.status(404).send('Product ID not found');
    } else {
      res.json(product[0]);
    }
  } catch (error) {
    res.status(500).send('Error fetching product');
  }
};

exports.getFeaturedProduct = async (req, res) => {
  try {
    const [featuredProduct] = await db.query('SELECT * FROM products WHERE Featured = 1');
    if (featuredProduct.length === 0) {
      res.status(404).send('Featured product not found');
    } else {
      res.json(featuredProduct[0]);
    }
  } catch (error) {
    res.status(500).send('Error fetching featured product');
  }
};