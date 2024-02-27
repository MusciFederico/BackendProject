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
        let role = undefined;

        if (req.headers.token) {
            const data = verifytoken(req.headers);
            role = data.role;
        }

        res.render('registration', {
            title: 'Registration Form',
            session: {
                user: {
                    role: role
                }
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
