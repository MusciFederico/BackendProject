import { faker } from "@faker-js/faker";
import usersRep from "../../repositories/users.rep.js";

function usersMock() {
    return {
        name: faker.person.firstName(),
        email:
            (faker.person.firstName() +
                faker.person.lastName()).toLowerCase() +
            faker.number.hex(64) +
            "@coder.com",
        password: "hola1234",
    };
}

async function createMocks() {
    const data = usersMock();
    await usersRep.create(data);
}
createMocks()