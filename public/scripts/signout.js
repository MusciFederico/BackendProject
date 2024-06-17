document.querySelector("#signout").addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem("token")
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
        let response = await fetch("/sessions/signout", opts)
        response = await response.json()

        response.statusCode === 200 ?
            (alert("Signed out successfully"), localStorage.removeItem("token"), location.replace("/")) :
            alert("Sign out failed");

    } catch (error) {
        alert("An unexpected error occurred");
    }
});

