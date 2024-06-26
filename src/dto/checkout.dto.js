class CheckoutDTO {
    constructor(data) {
        this.price_data = {
            product_data: { name: data.product_id.name },
            currency: "usd",
            unit_amount: data.product_id.price * 100
        }
        this.quantity = data.quantity;
    }
}

export default CheckoutDTO