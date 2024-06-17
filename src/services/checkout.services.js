import checkoutRep from '../repositories/checkout.rep.js';

class CheckoutService {
    constructor() {
        this.checkoutRep = checkoutRep; // You may need to adjust this depending on what checkoutRep actually is
    }

    payment = async (filter) => {
        try {
            const response = await this.checkoutRep(filter); // Call checkoutRep as a function
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const checkoutService = new CheckoutService();
export default checkoutService;
