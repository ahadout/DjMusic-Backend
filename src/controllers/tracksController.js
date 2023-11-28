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

exports.getCategoryTracks = async (req, res) => {
    const category = req.params.category;
  
    try {
      const [tracks] = await db.query('SELECT * FROM tracks WHERE category = ?', [category]);
      if (tracks.length === 0) {
        return res.status(404).send('No tracks found in this category');
      }
      res.json(tracks);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching tracks from the category');
    }
};