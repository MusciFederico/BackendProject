import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('real-time-products', { name: 'Real-Time Products' });
});

export default router;
