// controllers/productController.js
const db = require('../config/db');

//get all products from product table
exports.getProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
};

//get featured products only
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

//get products where type = hard_drives
exports.getHardDriveProducts = async (req, res) => {
  try {
    const [hardDriveProducts] = await db.query('SELECT * FROM products WHERE type = "hard_drive"');
    res.json(hardDriveProducts);
  } catch (error) {
    res.status(500).send('Error fetching hard drive products');
  }
};

exports.getCloudDriveProducts = async (req, res) => {
  try {
    const [cloudDriveProducts] = await db.query('SELECT * FROM products WHERE type = "cloud"');
    res.json(cloudDriveProducts);
  } catch (error) {
    res.status(500).send('Error fetching cloud drive products');
  }
};

//get a single product
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