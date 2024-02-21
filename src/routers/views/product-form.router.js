import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('product-form', { name: 'Product Form' });
});

export default router;
