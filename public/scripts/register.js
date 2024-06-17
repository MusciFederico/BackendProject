const selector = document.querySelector("#register");

selector.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            name: document.querySelector("#name").value,
            lastname: document.querySelector("#lastname").value,
            photo: document.querySelector("#photo").value,
            age: document.querySelector("#age").value
        };
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        let response = await fetch("/sessions/register", opts);
        response = await response.json();
        response.statusCode === 200 ?
            (alert("User registered successfully"), location.replace("/auth/login")) :
            response.statusCode === 409 ?
                (alert("Registration failed, user already registered"), location.replace("/auth/login")) :
                response.statusCode === 400 ?
                    alert("Registration failed, Password must be at least 8 characters long") :
                    response.statusCode === 422 ?
                        alert("Registration failed, Invalid email format") :
                        response.statusCode === 401 ?
                            alert("Registration failed, empty email, password and/or name input") :
                            alert("Registration failed");
    } catch (error) {
        alert("An unexpected error occurred:");
    }
});
