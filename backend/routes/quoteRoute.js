//routes/quoteRoute.js
const axios = require('axios');
const express = require('express');
const router = express.Router();
const quotes = require('../models/quotes');

router.get('/randomQuote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.send({ quote: randomQuote });
  });

module.exports = router;