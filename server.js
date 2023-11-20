require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
app.use(cors());
app.use(express.json());
let test = {test: "hello test"};
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/test', (req, res) => {
    res.send(test);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});