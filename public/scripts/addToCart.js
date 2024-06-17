function decrementQuantity() {
    const quantityInput = document.getElementById("quantityInput");
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function incrementQuantity() {
    const quantityInput = document.getElementById("quantityInput");
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
}

document.querySelector("#addToCart").addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const data = {
            user_id: document.querySelector("#user_id").textContent,
            product_id: document.querySelector("#product_id").textContent,
            quantity: document.querySelector("#quantityInput").value
        };
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/orders", opts)
        response = await response.json()
        response.statusCode === 201 ?
            (alert("Added to cart!"), location.replace("/")) :
            (alert("Error adding to cart"))
    } catch (error) {
        alert("An unexpected error occurred");
    }
});


