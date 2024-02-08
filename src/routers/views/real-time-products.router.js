const express = require('express');
const router = express.Router();

// Route to serve the real-time products page
router.get('/', (req, res) => {
    res.render('real-time-products', { title: 'Real-Time Products' });
});

module.exports = router;
