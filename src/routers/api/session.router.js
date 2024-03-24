// import express from 'express';
// import has8charMid from "../../middlewares/has8char.mid.js";
// import isValidPassMid from "../../middlewares/isValidPass.mid.js";
// import { usersManager } from '../../data/mongo/manager.mongo.js';
// import passport from "../../middlewares/passport.mid.js"
// import passCallBackMid from '../../middlewares/passCallBack.mid.js';

// const router = express.Router();

// const sessionsRouter = router;

// sessionsRouter.post(
//     "/register",
//     has8charMid,
//     passCallBackMid("register"),
//     async (req, res, next) => {
//         try {
//             return res.json({
//                 statusCode: 200,
//                 message: "Registered!",
//             });
//         } catch (error) {
//             return next(error);
//         }
//     });

// sessionsRouter.post(
//     "/login",
//     passCallBackMid("login"),
//     async (req, res, next) => {
//         try {
//             return res.cookie("token", req.token, {
//                 maxAge: 7 * 24 * 60 * 60,
//                 httpOnly: true
//             })
//                 .json({
//                     statusCode: 200,
//                     message: "Logged in!",
//                     // session: req.session
//                 });
//         } catch (error) {
//             return next(error);
//         }
//     });
// //req.session anda raro
// sessionsRouter.post(
//     "/",
//     async (req, res, next) => {
//         try {
//             console.log("req", req.user);
//             if (req.session.email) {
//                 return res.json({
//                     statusCode: 200,
//                     message: "Session with email: " + req.session.email
//                 })
//             } else {
//                 const error = new Error("No Auth");
//                 error.statusCode = 400;
//                 throw error;
//             }
//         } catch (error) {
//             return next(error)
//         }
//     });

// sessionsRouter.post(
//     "/signout",
//     passCallBackMid("jwt"),
//     async (req, res, next) => {
//         try {
//             return res.clearCookie("token").json({
//                 statusCode: 200,
//                 message: "Signed out!"
//             })
//         } catch (error) {
//             return next(error)
//         }
//     });

// sessionsRouter.get(
//     "/badauth",
//     (req, res, next) => {
//         try {
//             return res.json({
//                 statusCode: 401,
//                 message: "Bad auth"
//             })
//         } catch (error) {
//             return next(error);
//         }
//     })

// sessionsRouter.get(
//     "/badauth/cb",
//     (req, res, next) => {
//         try {
//             return res.json({
//                 statusCode: 400,
//                 message: "Already done"
//             })
//         } catch (error) {
//             return next(error);
//         }
//     })
// //fetchear este post
// sessionsRouter.get(
//     "/google", passport.authenticate("google", { scope: ["email", "profile"] }));

// sessionsRouter.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/api/sessions/badauth" }), async (req, res, next) => {
//     try {
//         return res.json({
//             statusCode: 200,
//             message: "Logged in with Google!",
//             session: req.session
//         });
//     } catch (error) {
//         return next(error);
//     }
// });

// export default sessionsRouter;
import CustomRouter from '../Customrouter.js';
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import { register, login, google, me, signout, badauth, } from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
    init() {
        this.create("/register", ["PUBLIC"], passCallBack("register"), register);

        this.create("/login", ["PUBLIC"], passCallBack("login"), login);

        this.create("/google", ["PUBLIC"], passport.authenticate("google",
            { scope: ["email", "profile"] }));

        this.read("/google/callback", ["PUBLIC"], passport.authenticate("google",
            { session: false, failureRedirect: "/api/sessions/badauth", }), google);

        this.create("/", ["USER", "ADMIN", "PREM"], me);

        this.create("/signout", ["USER", "ADMIN", "PREM"], signout);

        this.read("/badauth", ["PUBLIC"], badauth);
    }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();