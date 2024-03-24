const selector = document.querySelector("#buscar");

selector.addEventListener("click", () => {
    try {
        const filter = document.querySelector("#filter").value;
        const sort = document.querySelector("#sort").value;

        // Construir la URL con los parámetros de filtro y orden
        const filterParam = encodeURIComponent(JSON.stringify({ name: filter }));
        const sortParam = encodeURIComponent(JSON.stringify({ price: parseInt(sort) }));
        const url = `/?filter=${filterParam}&sort=${sortParam}`;

        window.location.href = url;
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error al procesar la solicitud.");
    }
});
