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

const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
}
document.querySelector("#buyButton").onclick = () => fetch(
    "/checkout",
    opts
)
    .then((res) => res.json())
    .then((data) => {
        location.replace(data.response.url)
    });

document.addEventListener('DOMContentLoaded', () => {
    event.preventDefault();
    const removeButtons = document.querySelectorAll('[id^="remove_"].removeItem');
    removeButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const orderId = event.target.id.split('_')[1]; // Extract the order ID from the button ID
            try {
                let response = await fetch(`/api/orders/${orderId}`, {
                    method: 'DELETE'
                });
                response = await response.json();
                if (response.statusCode === 200) {
                    alert('Item remove successfully');
                    window.location.reload();
                } else {
                    alert('Failed to remove item from cart:');
                }
            } catch (error) {
                alert('Error removing item from cart:');
            }
        });
    });
    const addButtons = document.querySelectorAll('[id^="add"].addItem');
    addButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const orderId = event.target.id.split('_')[1]; // Extract the order ID from the button ID
            let quantityElement = document.getElementById(`quantity_${orderId}`).innerText;
            let quantity = parseInt(quantityElement.split(": ")[1]);
            quantity++
            const data = {
                quantity: quantity
            }
            const opts = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };

            try {
                let response = await fetch(`/api/orders/${orderId}`, opts)
                response = await response.json();
                if (response.statusCode === 200) {
                    alert('Item added successfully');
                    window.location.reload();
                } else {
                    alert('Failed to add item from cart:');
                }
            } catch (error) {
                alert('Error removing item from cart:');
            }
        });
    });
});
