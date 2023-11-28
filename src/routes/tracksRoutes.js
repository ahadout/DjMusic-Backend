// routes/tracksRoutes.js or app.js
const express = require('express');
const router = express.Router();
const tracksController = require('../controllers/tracksController');

// Route to get all tracks
router.get('/', tracksController.getAllTracks);

module.exports = router;
