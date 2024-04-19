import CustomRouter from '../CustomRouter.js';
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import { register, login, google, me, signout, badauth, verifyAccount } from "../../controllers/sessions.controller.js";

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

        this.update("/verify", ["PUBLIC"], verifyAccount);
    }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();