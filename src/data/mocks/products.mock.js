import { faker } from "@faker-js/faker";
import productsRep from "../../repositories/products.rep.js";

function usersMock() {
    return {
        name: faker.commerce.productName(),
        img: faker.image.urlPicsumPhotos(),
        place: faker.location.city(),
        price: faker.commerce.price()
    };
}

async function createMocks() {
    const data = usersMock();
    await productsRep.create(data);
}
createMocks()