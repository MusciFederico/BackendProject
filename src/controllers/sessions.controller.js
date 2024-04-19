// // class SessionsController {
// //     register = async (req, res, next) => {
// //         try {
// //             return res.success200("Registered!");
// //         } catch (error) {
// //             return next(error);
// //         }
// //     };
// //     login = async (req, res, next) => {
// //         try {
// //             return res
// //                 .cookie("token", req.token, {
// //                     maxAge: 7 * 24 * 60 * 60,
// //                     // httpOnly: true,
// //                 })
// //                 .success200("Logged in!");
// //         } catch (error) {
// //             return next(error);
// //         }
// //     };
// //     google = async (req, res, next) => {
// //         try {
// //             return res.success200("Logged in with Google!");
// //         } catch (error) {
// //             return next(error);
// //         }
// //     };
// //     me = async (req, res, next) => {
// //         try {
// //             const user = {
// //                 email: req.user.email,
// //                 role: req.user.role,
// //                 photo: req.user.photo,
// //             };
// //             return res.success200(user);
// //         } catch (error) {
// //             return next(error);
// //         }
// //     };
// //     signout = async (req, res, next) => {
// //         try {
// //             return res.clearCookie("token").success200("Signed out!");
// //         } catch (error) {
// //             return next(error);
// //         }
// //     };
// //     badauth = (req, res, next) => {
// //         try {
// //             return res.error401();
// //         } catch (error) {
// //             return next(error);
// //         }
// //     };
// // }

// // export default SessionsController;
// // const controller = new SessionsController();
// // const { register, login, google, me, signout, badauth } = controller;
// // export { register, login, google, me, signout, badauth };
// class SessionsController {
//     register = async (req, res, next) => {
//         try {
//             return res.success200("Registered!");
//         } catch (error) {
//             return next(error);
//         }
//     };
//     login = async (req, res, next) => {
//         try {
//             return res
//                 .cookie("token", req.token, {
//                     maxAge: 7 * 24 * 60 * 60,
//                     // httpOnly: true,
//                 })
//                 .success200("Logged in!");
//         } catch (error) {
//             return next(error);
//         }
//     };
//     google = async (req, res, next) => {
//         try {
//             return res.success200("Logged in with Google!");
//         } catch (error) {
//             return next(error);
//         }
//     };
//     me = async (req, res, next) => {
//         try {
//             const user = {
//                 email: req.user.email,
//                 role: req.user.role,
//                 photo: req.user.photo,
//             };
//             return res.success200(user);
//         } catch (error) {
//             return next(error);
//         }
//     };
//     signout = async (req, res, next) => {
//         try {
//             return res.clearCookie("token").success200("Signed out!");
//         } catch (error) {
//             return next(error);
//         }
//     };
//     badauth = (req, res, next) => {
//         try {
//             return res.error401();
//         } catch (error) {
//             return next(error);
//         }
//     };
// }

// export default SessionsController;
// const controller = new SessionsController();
// const { register, login, google, me, signout, badauth } = controller;
// export { register, login, google, me, signout, badauth };

// class SessionsController {
//     register = async (req, res, next) => {
//         try {
//             return res.success200("Registered!");
//         } catch (error) {
//             return next(error);
//         }
//     };
//     login = async (req, res, next) => {
//         try {
//             return res
//                 .cookie("token", req.token, {
//                     maxAge: 7 * 24 * 60 * 60,
//                     // httpOnly: true,
//                 })
//                 .success200("Logged in!");
//         } catch (error) {
//             return next(error);
//         }
//     };
//     google = async (req, res, next) => {
//         try {
//             return res.success200("Logged in with Google!");
//         } catch (error) {
//             return next(error);
//         }
//     };
//     me = async (req, res, next) => {
//         try {
//             const user = {
//                 email: req.user.email,
//                 role: req.user.role,
//                 photo: req.user.photo,
//             };
//             return res.success200(user);
//         } catch (error) {
//             return next(error);
//         }
//     };
//     signout = async (req, res, next) => {
//         try {
//             return res.clearCookie("token").success200("Signed out!");
//         } catch (error) {
//             return next(error);
//         }
//     };
//     badauth = (req, res, next) => {
//         try {
//             return res.error401();
//         } catch (error) {
//             return next(error);
//         }
//     };
// }

// export default SessionsController;
// const controller = new SessionsController();
// const { register, login, google, me, signout, badauth } = controller;
// export { register, login, google, me, signout, badauth };
import { response } from 'express';
import usersService from '../services/users.services.js';


class SessionsController {
    constructor() {
        this.service = usersService;
    }
    register = async (req, res, next) => {
        const { email, name } = req.body;
        await this.service.register({ email, name })
        try {
            return res.success200("Registered!");
        } catch (error) {
            return next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            return res
                .cookie("token", req.token, {
                    maxAge: 7 * 24 * 60 * 60,
                    // httpOnly: true,
                })
                .success200("Logged in!");
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
            return res.clearCookie("token").success200("Signed out!");
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
            console.log("user", user);
            if (user.verifycode === verifycode) {
                const response = await usersService.update(id, { verified: true })
                console.log("response", response);
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