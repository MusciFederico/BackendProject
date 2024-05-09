import express from 'express';
import logger from '../../utils/logger/logger.factory.js';

const router = express.Router();

router.get("/simplex", (req, res, next) => {
    try {
        logger.INFO(process.pid)
        let total = 1;
        for (let i = 1; i < 100; i++) {
            total = i * i;
        }
        return res.send({ total });
    } catch (error) {
        return next(error)
    }
});
router.get("/complex", (req, res, next) => {
    try {
        logger.INFO(process.pid)
        let total = 1;
        for (let i = 1; i < 10000000000; i++) {
            total = i * i;
        }
        return res.send({ total });
    } catch (error) {
        return next(error)
    }
});
export default router;
