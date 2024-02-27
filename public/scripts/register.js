const selector = document.querySelector("#register")

selector.addEventListener("click", async () => {
    try {
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            name: document.querySelector("#name").value,
            lastname: document.querySelector("#lastname").value,
            photo: document.querySelector("#photo").value,
            age: document.querySelector("#age").value
        }
        console.log(data);
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let response = await fetch("/sessions/register", opts) //probar session auth y otros
        response = await response.json()
        alert(response.message);
        //response.session && location.replace("/auth/login");
    } catch (error) {
        alert(error.message)
    }
})
