require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const tracksRoutes = require('./src/routes/tracksRoutes');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

// Get from products table
app.use('/api/products', productRoutes);

// Get from tracks table
app.use('/api/tracks', tracksRoutes);

app.get('/', (req, res) => {
  res.send('Hello World from DjMusic!');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});