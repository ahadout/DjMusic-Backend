require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});