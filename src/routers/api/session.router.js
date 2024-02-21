import express from 'express';
import has8charMid from "../../middlewares/has8char.mid.js";
import isValidPassMid from "../../middlewares/isValidPass.mid.js";
import { usersManager } from '../../data/mongo/manager.mongo.js';

const router = express.Router();

const sessionsRouter = router;

sessionsRouter.post("/register", has8charMid, async (req, res, next) => {
    try {
        const data = req.body;
        await usersManager.create(data);
        return res.json({
            statusCode: 201,
            message: "Registered!",
        });
    } catch (error) {
        return next(error);
    }
});

sessionsRouter.post("/login", isValidPassMid, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email && password === "hola1234") { 
            req.session.role = "admin";
            req.session.email = email;
            return res.json({
                statusCode: 200,
                message: "Logged in!",
                session: req.session
            });
        }
        const error = new Error("Bad Auth");
        error.statusCode = 401;
        throw error;
    } catch (error) {
        return next(error);
    }
});

sessionsRouter.post("/", async (req, res, next) => {
    try {
        if (req.session.email) {
            return res.json({
                statusCode: 200,
                message: "Session with email: " + req.session.email
            })
        } else {
            const error = new Error("No Auth");
            error.statusCode = 400;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
});

sessionsRouter.post("/signout", async (req, res, next) => {
    try {
        if (req.session.email) {
            req.session.destroy()
            return res.json({
                statusCode: 200,
                message: "Signed out!"
            })
        } else {
            const error = new Error("No Auth");
            error.statusCode = 401;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
});

export default sessionsRouter;
