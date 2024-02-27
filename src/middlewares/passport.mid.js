import passport from "passport"
import { usersManager } from "../data/mongo/manager.mongo.js"
import { Strategy as LocalStrategy } from "passport-local"
import { createHash, verifyHash } from "../utils/hash.js"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
const { GOOGLE_ID, GOOGLE_CLIENT } = process.env
import { createToken } from '../utils/token.js';

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            let one = await usersManager.readByEmail(email);
            if (one) {
                return done(null, false);
            } else {
                let data = await req.body
                data.password = createHash(password);
                let user = await usersManager.create(data);
                return done(null, user);
            }
        } catch (error) {
            return done(error)
        }
    }
))

passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const user = await usersManager.readByEmail(email)
            console.log('user:', user)
            if (user) {
                const verify = verifyHash(password, user.password)
                if (verify) {
                    req.session.email = email
                    req.session.role = user.role
                    const token = createToken({ email, role: user.role });
                    req.token = token;
                    console.log(req.session);
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error)
        }
    }
));

passport.use(
    "google",
    new GoogleStrategy(
        {
            passReqToCallback: true,
            // clientID: GOOGLE_ID,
            clientID: "175512523387-mugkb7sk5190joetn4ibeqk8qiqpt1k1.apps.googleusercontent.com",
            // clientSecret: GOOGLE_CLIENT,
            clientSecret: "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",
            callbackURL: "http://localhost:8080/sessions/google/callback"
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                let user = await usersManager.readByEmail(profile.id)
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
                    user = await usersManager.create(user)
                    req.session.email = user.email
                    req.session.role = user.role
                    return done(null, user)
                }
            } catch (error) {
                return done(error);
            }
        }),
);

export default passport