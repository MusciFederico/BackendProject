import { response } from 'express';
import usersService from '../services/users.services.js';


class SessionsController {
    constructor() {
        this.service = usersService;
    }
    register = async (req, res, next) => {
        try {
            if (req.user) {
                return res.success200("Registered!");
            } else {
                res.error401()
            }
        } catch (error) {
            return next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            res.cookie("token", req.token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                // httpOnly: true,
            });
            return res.success200({
                message: "Logged in!",
                token: req.token,
            });

        } catch (error) {
            return next(error);
        }
    };
    google = async (req, res, next) => {
        try {
            return res.success200("Logged in with Google!");
        } catch (error) {
            return next(error);
        }
    };
    me = async (req, res, next) => {
        try {
            const user = {
                email: req.user.email,
                role: req.user.role,
                photo: req.user.photo,
            };
            return res.success200(user);
        } catch (error) {
            return next(error);
        }
    };
    signout = async (req, res, next) => {
        try {
            res.clearCookie("token").success200("Signed out!");
        } catch (error) {
            return next(error);
        }
    };
    badauth = (req, res, next) => {
        try {
            return res.error401();
        } catch (error) {
            return next(error);
        }
    };
    verifyAccount = async (req, res, next) => {
        try {
            const { verifycode, email } = req.body;
            const user = usersService.readByEmail(email)
            if (user.verifycode === verifycode) {
                const response = await usersService.update(id, { verified: true })
                return res.success200("verified!");
            } else {
                res.error401();
            }
        } catch (error) {
            return next(error);
        }
    };
}

export default SessionsController;
const controller = new SessionsController();
const { register, login, google, me, signout, badauth, verifyAccount } = controller;
export { register, login, google, me, signout, badauth, verifyAccount };