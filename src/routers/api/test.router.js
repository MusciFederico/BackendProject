
import CustomRouter from '../CustomRouter.js';
import logger from '../../utils/logger/logger.factory.js';

class TestingRouter extends CustomRouter {
    async handleSimplex(req, res, next) {
        try {
            logger.INFO(process.pid);
            let total = 1;
            for (let i = 1; i < 100; i++) {
                total = i * i;
            }
            return res.send({ total });
        } catch (error) {
            return next(error);
        }
    }

    async handleComplex(req, res, next) {
        try {
            logger.INFO(process.pid);
            let total = 1;
            for (let i = 1; i < 10000000000; i++) {
                total = i * i;
            }
            return res.send({ total });
        } catch (error) {
            return next(error);
        }
    }

    init() {
        this.read('/simplex', ["ADMIN"], this.handleSimplex.bind(this));
        this.read('/complex', ["ADMIN"], this.handleComplex.bind(this));
    }
}

const testingRouter = new TestingRouter();
export default testingRouter.getRouter();