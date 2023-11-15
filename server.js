const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());

let test = {test: "hello test"};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/test', (req, res) => {
    res.send(test);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});