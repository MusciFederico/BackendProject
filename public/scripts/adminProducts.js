document.querySelector("#updateProduct").addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const pid = {
            product_id: document.querySelector("#product_id").textContent,
        }
        const data = {
            name: document.querySelector("#productName").value,
            price: document.querySelector("#productPrice").value,
            stock: document.querySelector("#productStock").value,
            Img: document.querySelector("#productImg").value,
        };
        const opts = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        let response = await fetch(`/api/products/${pid.product_id}`, opts);

        response = await response.json();
        response.statusCode === 200 ?
            (alert("Product updated succesfully"), window.location.reload()) :
            alert("Product update failed");
    } catch (error) {
        alert("An unexpected error occurred");
    }
});

document.querySelector("#deleteProduct").addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const pid = {
            product_id: document.querySelector("#product_id").textContent,
        }
        const opts = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        let response = await fetch(`/api/products/${pid.product_id}`, opts);
        response = await response.json();
        response.statusCode === 200 ?
            (alert("Product deleted succesfully"), location.replace("/")) :
            alert("Product delete failed");
    } catch (error) {
        alert("An unexpected error occurred");
    }
});


