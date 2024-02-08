const express = require('express');
const router = express.Router();

// Route to serve the product form
router.get('/', (req, res) => {
    res.render('product-form', { title: 'Product Form' });
});

module.exports = router;
