const updateSortCriteria = (newSortCriteria) => {
    // Parse the current URL parameters
    const params = new URLSearchParams(window.location.search);

    const filterParam = params.get("filter");
    const sortParam = params.get("sort");

    const filterCriteria = filterParam ? JSON.parse(filterParam) : {};
    const sortCriteria = sortParam ? JSON.parse(sortParam) : {};

    Object.assign(sortCriteria, newSortCriteria);

    // Manually construct the new URL with the unencoded JSON string
    const filterString = JSON.stringify(filterCriteria);
    const sortString = JSON.stringify(sortCriteria);

    const newUrl = `${window.location.pathname}?filter=${filterString}&sort=${sortString}`;

    window.location.href = newUrl;
};

const updateFilterCriteria = (newFilterCriteria) => {

    const params = new URLSearchParams(window.location.search);

    const filterParam = params.get("filter");
    const sortParam = params.get("sort");

    const filterCriteria = filterParam ? JSON.parse(filterParam) : {};
    const sortCriteria = sortParam ? JSON.parse(sortParam) : {};

    Object.assign(filterCriteria, newFilterCriteria);

    const filterString = JSON.stringify(filterCriteria);
    const sortString = JSON.stringify(sortCriteria);

    const newUrl = `${window.location.pathname}?filter=${filterString}&sort=${sortString}`;

    window.location.href = newUrl;
};


// Event listener for "less stock" button
const lessStock = document.querySelector("#lessStock");
lessStock.addEventListener("click", (event) => {
    event.preventDefault();
    try {
        updateSortCriteria({ stock: 1 });
    } catch (error) {
        alert("Error applying sort");
        throw error;
    }
});

// Event listener for "cheapest" button
const cheapest = document.querySelector("#cheapest");
cheapest.addEventListener("click", (event) => {
    event.preventDefault();
    try {
        updateSortCriteria({ price: 1 });
    } catch (error) {
        alert("Error applying sort");
        throw error;
    }
});

// Event listener for "most expensive" button
const expensive = document.querySelector("#expensive");
expensive.addEventListener("click", (event) => {
    event.preventDefault();
    try {
        updateSortCriteria({ price: -1 });
    } catch (error) {
        alert("Error applying sort");
        throw error;
    }
});

// Event listener for "most stock" button
const mostStock = document.querySelector("#mostStock");
mostStock.addEventListener("click", (event) => {
    event.preventDefault();
    try {
        updateSortCriteria({ stock: -1 });
    } catch (error) {
        alert("Error applying sort");
        throw error;
    }
});

const aToZ = document.querySelector("#aToZ");
aToZ.addEventListener("click", (event) => {
    event.preventDefault();
    try {
        updateSortCriteria({ name: 1 });
    } catch (error) {
        alert("Error applying sort");
        throw error;
    }
});

const zToA = document.querySelector("#zToA");
zToA.addEventListener("click", (event) => {
    event.preventDefault();
    try {
        updateSortCriteria({ name: -1 });
    } catch (error) {
        alert("Error applying sort");
        throw error;
    }
});

const nameFilter = document.querySelector("#name");
nameFilter.addEventListener("click", (event) => {
    event.preventDefault();
    try {
        alert("event.target");
        const nameinput = document.querySelector('#nameInput').value;
        console.log(nameinput);
        updateFilterCriteria({ name: nameinput });
    } catch (error) {
        alert("Error applying filter");
        throw error;
    }
});