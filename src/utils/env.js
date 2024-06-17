import { config } from "dotenv";
import args from "./args.js";

const { env } = args
const path =
    env === "prod" ? "./.env.prod" : env === "dev" ? "./.env.dev" : "./.env.test"
config({ path })

export default {
    PORT: process.env.PORT,

    DB_LINK: process.env.DB_LINK,

    SECRET: process.env.SECRET,

    SECRET_KEY: process.env.SECRET_KEY,

    GOOGLE_ID: process.env.GOOGLE_ID,

    GOOGLE_CLIENT: process.env.GOOGLE_CLIENT,

    GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,

    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,

    TWILIO_SID: process.env.TWILIO_SID,

    TWILIO_TOKEN: process.env.TWILIO_TOKEN,

    TWILIO_PHONE: process.env.TWILIO_PHONE,

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
}