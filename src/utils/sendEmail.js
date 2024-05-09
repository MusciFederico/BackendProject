import { createTransport } from "nodemailer";
import env from "./env.js";
import logger from "./logger/logger.factory.js";

async function sendEmail(data) {
    try {
        logger.INFO("Sending email, " + data);
        const transport = createTransport({
            service: 'gmail',
            port: env.PORT || 8080,   // process.env.PORT
            auth: { user: env.GOOGLE_EMAIL, pass: env.GOOGLE_PASSWORD }
        })
        await transport.sendMail({
            from: `Chrysus <${env.GOOGLE_EMAIL}>`,
            to: data.email,
            subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
            html: "<h1>USER REGISTERED!<h1>",
        })

    } catch (error) {
        throw (error);
    }
}

export default sendEmail