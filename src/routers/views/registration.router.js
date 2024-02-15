import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    res.render('registration', { title: 'Registration Form' });
});

export default router;
