import CheckoutDTO from "../dto/checkout.dto.js";
import Stripe from "stripe";
import env from "../utils/env.js";
import ordersManager from "../data/mongo/orders.mongo.js";
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

const checkoutRep = async (filter) => {
    try {
        let cart = await ordersManager.readOrdersById(filter)
        cart = cart.map(each => new CheckoutDTO(each));
        const line_items = cart
        const mode = "payment"
        const success_url = "http://localhost:8080/thanks"
        const intent = await stripe.checkout.sessions.create({ line_items, mode, success_url })
        return intent
    } catch (error) {
        throw error;
    }
};

export default checkoutRep