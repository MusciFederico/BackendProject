const selector = document.querySelector("#login");

selector.addEventListener("click", async () => {
    event.preventDefault();
    const data = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    };

    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    try {
        let response = await fetch("/sessions/login", opts);
        response = await response.json();
        response.statusCode === 200 ?
            (alert("Logged in successfully"), location.replace("/")) :
            response.statusCode === 401 ?
                alert("Login failed, user does not exist") :
                alert("Registration failed");
    } catch (error) {
        alert("An error occurred");
    }
});
