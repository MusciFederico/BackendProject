// import express from 'express';
// const router = express.Router();
// router.get('/', (req, res) => {
//     res.render('registration', { title: 'Registration Form' });
// });

// export default router;

import express from 'express';
import { verifytoken } from '../../utils/token.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.render('registration', {
            title: 'Registration Form',
        });
    } catch (error) {
        next(error);
    }
});

export default router;
