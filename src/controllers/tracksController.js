// controllers/tracksController.js
const db = require('../config/db');

exports.getAllTracks = async (req, res) => {
  try {
    const [tracks] = await db.query('SELECT * FROM tracks');
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
};
