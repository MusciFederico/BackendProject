import Twilio from "twilio";
import env from "./env.js";
const { TWILIO_SID, TWILIO_TOKEN, TWILIO_PHONE } = env

async function sendSms(phone) {
    try {
        const transport = twilio(TWILIO_SID, TWILIO_TOKEN)
        transport.messages.create(
            {
                body: "mensaje de Chrysus",
                from: TWILIO_PHONE,
                to: phone
            }
        );
    } catch (error) {
        throw error;
    }
}


export default sendSms;