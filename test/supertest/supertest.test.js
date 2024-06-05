// import { expect } from "chai";
// import supertest from "supertest";
// import dao from "../../src/data/index.factory.js";
// import logger from "../../src/utils/logger/logger.factory.js";
// import env from "../../src/utils/env.js";
// const { users } = dao;

// const requester = supertest(`http://localhost:8080`);
// logger.INFO(env.PORT);

// describe("server testing", function () {
//     this.timeout(10000000); // Increase timeout for the entire suite to 10 seconds

//     describe("register testing", function () {
//         const user = {
//             name: "test",
//             email: "test@test.com",
//             password: "hola1234",
//             role: 1
//         };
//         let _id;
//         let token = {}

//         it("user registration", async () => {
//             this.timeout(10000);
//             const response = await requester.post("/sessions/register").send(user);
//             const result = response._body.statusCode
//             logger.INFO(result)
//             expect(result).to.be.equals(200);
//         });

//         it("user login", async () => {
//             this.timeout(10000);
//             const response = await requester.post("/sessions/login").send({ email: user.email, password: user.password });
//             const { headers } = response;
//             const result = response._body.statusCode
//             token = headers['set-cookie'][0].split('=')[1].split(';')[0]; // Extract the token from the cookie
//             logger.INFO(token);
//             logger.INFO(result)
//             expect(result).to.be.equals(200);
//             expect(token).to.exist;
//         });

//         it("user me", async () => {
//             this.timeout(10000);
//             const response = await requester.post("/sessions").set('Cookie', `token=${token}`).send();
//             const result = response._body;
//             logger.INFO(result.statusCode);
//             expect(result.statusCode).to.be.equals(200);
//             expect(result.response.email).to.be.equals(user.email);
//             expect(result.response.role).to.be.equals(user.role);
//         });

//         it("user id recovery", async function () {
//             this.timeout(10000); // Increase timeout for this specific test to 10 seconds
//             const response = await requester.get(`/api/users/email/${user.email}`);
//             const responseBody = JSON.parse(response.text);
//             _id = responseBody.response._id;
//             const result = response._body.statusCode
//             logger.INFO(result)
//             expect(result).to.be.equals(200)
//             expect(_id).to.exist;
//         });

//         it("user signout", async () => {
//             this.timeout(10000);
//             const response = await requester.post("/sessions/signout").set('Cookie', `token=${token}`).send();
//             const result = response._body.statusCode
//             logger.INFO(result)
//             expect(result).to.be.equals(200);
//         });

//         it("user deletion", async () => {
//             this.timeout(10000);
//             const response = await requester.delete(`/api/users/${_id}`);
//             const { statusCode } = response;
//             expect(statusCode).to.be.equals(200);
//         });
//     });
// });

import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.factory.js";
import logger from "../../src/utils/logger/logger.factory.js";
import env from "../../src/utils/env.js";
const { users, products } = dao;

const requester = supertest(`http://localhost:8080`);
logger.INFO(env.PORT);

describe("server testing", function () {
    this.timeout(10000000); // Increase timeout for the entire suite to 10 seconds

    describe("register testing", function () {
        const user = {
            name: "test",
            email: "test@test.com",
            password: "hola1234",
            role: 1
        };
        let _id;
        let token = {}

        it("user registration", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/register").send(user);
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });

        it("user login", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/login").send({ email: user.email, password: user.password });
            const { headers } = response;
            const result = response._body.statusCode
            token = headers['set-cookie'][0].split('=')[1].split(';')[0]; // Extract the token from the cookie
            logger.INFO(token);
            logger.INFO(result)
            expect(result).to.be.equals(200);
            expect(token).to.exist;
        });

        it("user me", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions").set('Cookie', `token=${token}`).send();
            const result = response._body;
            logger.INFO(result.statusCode);
            expect(result.statusCode).to.be.equals(200);
            expect(result.response.email).to.be.equals(user.email);
            expect(result.response.role).to.be.equals(user.role);
        });

        it("user id recovery", async function () {
            this.timeout(10000); // Increase timeout for this specific test to 10 seconds
            const response = await requester.get(`/api/users/email/${user.email}`);
            const responseBody = JSON.parse(response.text);
            _id = responseBody.response._id;
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200)
            expect(_id).to.exist;
        });

        it("user signout", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/signout").set('Cookie', `token=${token}`).send();
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });

        it("user deletion", async () => {
            this.timeout(10000);
            const response = await requester.delete(`/api/users/${_id}`);
            const { statusCode } = response;
            expect(statusCode).to.be.equals(200);
        });
    });
});
