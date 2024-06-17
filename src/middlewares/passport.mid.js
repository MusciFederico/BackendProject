

// import env from "../utils/env.js"
// import passport from "passport"
// import usersManager from '../data/mongo/users.mongo.js';
// import { Strategy as LocalStrategy } from "passport-local"
// import { createHash, verifyHash } from "../utils/hash.js"
// import { Strategy as GoogleStrategy } from "passport-google-oauth2"
// import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
// const { GOOGLE_ID, GOOGLE_CLIENT, SECRET } = env
// import { createToken } from '../utils/token.js';

// passport.use("register", new LocalStrategy(
//     { passReqToCallback: true, usernameField: "email" },
//     async (req, email, password, done) => {
//         try {
//             let one = await usersManager.readByEmail(email);
//             if (one) {
//                 return done(null, false, { messages: "Already exists", statusCode: 400 })
//             } else {
//                 let data = await req.body
//                 data.password = createHash(password);
//                 let user = await usersManager.create(data);
//                 return done(null, user);
//             }
//         } catch (error) {
//             return done(error)
//         }
//     }
// ))

// passport.use("login", new LocalStrategy(
//     { passReqToCallback: true, usernameField: "email" },
//     async (req, email, password, done) => {
//         try {
//             const user = await usersManager.readByEmail(email)
//             // console.log('user:', user)
//             if (user) {
//                 const verify = verifyHash(password, user.password)
//                 if (verify) {
//                     // req.session.email = email
//                     // req.session.role = user.role
//                     const token = createToken({ email, role: user.role });
//                     req.token = token;
//                     // console.log(req.token);
//                     return done(null, user,);
//                 } else {
//                     return done(null, false, { messages: "Bad auth from passport cb" });
//                 }
//             } else {
//                 return done(null, false)
//             }
//         } catch (error) {
//             return done(error)
//         }
//     }
// ));

// passport.use(
//     "google",
//     new GoogleStrategy(
//         {
//             passReqToCallback: true,
//             clientID: GOOGLE_ID,
//             // clientID: "175512523387-mugkb7sk5190joetn4ibeqk8qiqpt1k1.apps.googleusercontent.com",
//             clientSecret: GOOGLE_CLIENT,
//             // clientSecret: "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",
//             callbackURL: "http://localhost:8080/sessions/google/callback"
//         },
//         async (req, accessToken, refreshToken, profile, done) => {
//             try {
//                 let user = await usersManager.readByEmail(profile.id)
//                 if (user) {
//                     req.session.email = user.email
//                     req.session.role = user.role
//                     return done(null, user)
//                 } else {
//                     user = {
//                         email: profile.id,
//                         name: profile.name.givenName,
//                         lastName: profile.name.familyName,
//                         photo: profile.coverPhoto,
//                         password: createHash(profile.id),
//                     }
//                     user = await usersManager.create(user)
//                     req.session.email = user.email
//                     req.session.role = user.role
//                     return done(null, user)
//                 }
//             } catch (error) {
//                 return done(error);
//             }
//         }),
// );

// passport.use(
//     "jwt",
//     new JwtStrategy({
//         jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
//         secretOrKey: 'secret2'
//         // secretOrKey: SECRET
//     }, async (payload, done) => {
//         try {
//             const user = await usersManager.readByEmail(payload.email);
//             if (user) {
//                 user.password = null;
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//             }
//         } catch (error) {
//             return done(error);
//         }
//     })
// );


// export default passport

import env from "../utils/env.js"
import passport from "passport"
import usersService from "../services/users.services.js";
import { Strategy as LocalStrategy } from "passport-local"
import { createHash, verifyHash } from "../utils/hash.js"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
// const { GOOGLE_ID, GOOGLE_CLIENT, SECRET } = env
import { createToken } from '../utils/token.js';

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return done(null, false, { messages: "invalid email format", statusCode: 422 })
            }
            let one = await usersService.readByEmail(email);
            if (one) {
                return done(null, false, { messages: "Already exists", statusCode: 409 })
            }
            if (password.length < 8) {
                return done(null, false, { messages: "Password should be at least 8 characters long", statusCode: 400 })
            }
            let data = await req.body
            let user = await usersService.create(data);
            return done(null, user);
        } catch (error) {
            return done(error)
        }
    }
))


passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const user = await usersService.readByEmail(email);

            const errorMessage = { message: "Invalid credentials", statusCode: 401 };

            if (!user) {
                return done(null, false, errorMessage);
            }

            const verify = verifyHash(password, user.password);
            if (!verify) {
                return done(null, false, errorMessage);
            }

            const token = createToken({ email, role: user.role });
            req.token = token;
            req.user = user;
            return done(null, user);

        } catch (error) {
            return done(error);
        }
    }
));



passport.use(
    "google",
    new GoogleStrategy(
        {
            passReqToCallback: true,
            clientID: env.GOOGLE_ID,
            clientSecret: env.GOOGLE_CLIENT,
            callbackURL: "http://localhost:8080/sessions/google/callback"
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                let user = await usersService.readByEmail(profile.id)
                if (user) {
                    req.session.email = user.email
                    req.session.role = user.role
                    return done(null, user)
                } else {
                    user = {
                        email: profile.id,
                        name: profile.name.givenName,
                        lastName: profile.name.familyName,
                        photo: profile.coverPhoto,
                        password: createHash(profile.id),
                    }
                    user = await usersService.create(user)
                    req.session.email = user.email
                    req.session.role = user.role
                    return done(null, user)
                }
            } catch (error) {
                return done(error);
            }
        }),
);

passport.use(
    "jwt",
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
        secretOrKey: env.SECRET
    }, async (payload, done) => {
        try {
            const user = await usersService.readByEmail(payload.email);
            if (user) {
                user.password = null;
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error);
        }
    })
);


export default passport