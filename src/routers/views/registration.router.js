const express = require('express');
const router = express.Router();

// Route to serve the registration page
router.get('/', (req, res) => {
    res.render('registration', { title: 'Registration Form' });
});

module.exports = router;
