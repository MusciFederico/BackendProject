import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.factory.js";
import logger from "../../src/utils/logger/logger.factory.js";
import env from "../../src/utils/env.js";

const requester = supertest(`http://localhost:8080`);
logger.INFO(env.PORT);

describe("Server testing", function () {
    this.timeout(10000000);

    const user = {
        name: "admin",
        email: "admin@test.com",
        password: "hola1234",
        role: 1
    };
    let token = {}
    let _id;
    let lastProduct

    const secondUser = {
        name: "user",
        email: "user@test.com",
        password: "hola1234",
        role: 0
    };
    let secondToken = {}
    let second_id;
    let lastOrder
    let randomUser

    describe("Product Management", function () {

        it("Register admin user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/register").send(user);
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });

        it("Login new admin user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/login").send({ email: user.email, password: user.password });
            const { headers } = response;
            const result = response._body.statusCode
            token = headers['set-cookie'][0].split('=')[1].split(';')[0]; // Extract the token from the cookie
            logger.INFO(result)
            expect(result).to.be.equals(200);
            expect(token).to.exist;
        });

        it("Check new admin profile", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions").set('Cookie', `token=${token}`).send();
            const result = response._body;
            logger.INFO(result.statusCode);
            expect(result.statusCode).to.be.equals(200);
            expect(result.response.email).to.be.equals(user.email);
            expect(result.response.role).to.be.equals(user.role);
        });

        it("Create a new product", async () => {
            this.timeout(10000);
            const product = {
                name: "product",
                img: "https://example.com/image.jpg",
                place: "Lugar de origen",
                price: 69.99,
                stock: 15
            };
            const response = await requester.post(`/api/products/`).set('Cookie', `token=${token}`).send(product);
            const result = response._body.statusCode
            logger.INFO(JSON.stringify(result));
            expect(result).to.be.equals(201);
        });

        it("Retrieve the last created product", async () => {
            this.timeout(10000);
            const response = await requester.get(`/api/products/`).set('Cookie', `token=${token}`).send();
            const result = response._body
            logger.INFO(JSON.stringify(result.statusCode));
            expect(result.statusCode).to.be.equals(200);
            expect(result.response).to.be.an('array').that.is.not.empty;
            JSON.stringify(lastProduct = result.response[result.response.length - 1]);
        });

        it("Check the last created product details", async () => {
            this.timeout(10000);
            const response = await requester.get(`/api/products/${lastProduct._id}`).set('Cookie', `token=${token}`).send();
            const result = response._body
            logger.INFO(JSON.stringify(result.statusCode));
            expect(result.statusCode).to.be.equals(200);
            expect(result.response).to.be.an('object').that.is.not.empty;
        });

        it("Update the last created product", async () => {
            this.timeout(10000);
            const productUpdate = {
                name: "productUpdate",
                img: "https://example.com/image.jpg",
                place: "Lugar de origen",
                price: 420.99,
                stock: 2
            };
            const response = await requester.put(`/api/products/${lastProduct._id}`).set('Cookie', `token=${token}`).send(productUpdate);
            const result = response._body.statusCode
            logger.INFO(JSON.stringify(result));
            expect(result).to.be.equals(200);
        });

        it("Sign out new admin user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/signout").set('Cookie', `token=${token}`).send();
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });
    });

    describe("Order Management", function () {

        it("Register a new normal user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/register").send(secondUser);
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });

        it("Login the new normal user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/login").send({ email: secondUser.email, password: secondUser.password });
            const { headers } = response;
            const result = response._body.statusCode
            secondToken = headers['set-cookie'][0].split('=')[1].split(';')[0]; // Extract the token from the cookie
            logger.INFO(result)
            expect(result).to.be.equals(200);
            expect(token).to.exist;
        });

        it("Check new normal user profile", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions").set('Cookie', `token=${secondToken}`).send();
            const result = response._body;
            logger.INFO(result.statusCode);
            expect(result.statusCode).to.be.equals(200);
            expect(result.response.email).to.be.equals(secondUser.email);
            expect(result.response.role).to.be.equals(secondUser.role);
        });

        it("Retrieve the new normal user ID by email", async function () {
            this.timeout(10000); // Increase timeout for this specific test to 10 seconds
            const response = await requester.get(`/api/users/email/${secondUser.email}`).set('Cookie', `token=${secondToken}`).send();
            const responseBody = JSON.parse(response.text);
            second_id = responseBody.response._id;
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200)
            expect(second_id).to.exist;
        });

        it("Check the new normal user details", async function () {
            this.timeout(10000); // Increase timeout for this specific test to 10 seconds
            const response = await requester.get(`/api/users/${second_id}`).set('Cookie', `token=${secondToken}`).send();
            const result = response._body;
            logger.INFO(result.statusCode);
            expect(result.statusCode).to.be.equals(200)
            expect(result.response._id).to.be.equals(second_id);
        });

        it("Create a new order for the new normal user", async () => {
            this.timeout(10000);
            const order = {
                user_id: second_id,
                product_id: lastProduct
            };
            const response = await requester.post(`/api/orders/`).set('Cookie', `token=${secondToken}`).send(order);
            const result = response._body.statusCode
            logger.INFO(JSON.stringify(result));
            expect(result).to.be.equals(201);
        });

        it("User sign out the new normal user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/signout").set('Cookie', `token=${secondToken}`).send();
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });
    });

    describe("Order and User Management", function () {

        it("Login admin user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/login").send({ email: user.email, password: user.password });
            const { headers } = response;
            const result = response._body.statusCode
            token = headers['set-cookie'][0].split('=')[1].split(';')[0]; // Extract the token from the cookie
            logger.INFO(result)
            expect(result).to.be.equals(200);
            expect(token).to.exist;
        });

        it("Check admin profile", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions").set('Cookie', `token=${token}`).send();
            const result = response._body;
            logger.INFO(result.statusCode);
            expect(result.statusCode).to.be.equals(200);
            expect(result.response.email).to.be.equals(user.email);
            expect(result.response.role).to.be.equals(user.role);
        });

        it("Retrieve the last created order", async () => {
            this.timeout(10000);
            const response = await requester.get(`/api/orders/`).set('Cookie', `token=${token}`).send();
            const result = response._body
            logger.INFO(JSON.stringify(result.statusCode));
            expect(result.statusCode).to.be.equals(200);
            expect(result.response).to.be.an('array').that.is.not.empty;
            JSON.stringify(lastOrder = result.response[result.response.length - 1]);
        });

        it("Create a random user", async () => {
            this.timeout(10000);
            const RandomUser = {
                name: "RandomUser",
                email: "RandomUser@test.com",
                password: "hola1234",
                role: 2
            };
            const response = await requester.post(`/api/users/`).set('Cookie', `token=${token}`).send(RandomUser);
            const result = response._body
            logger.INFO(JSON.stringify(result.statusCode));
            expect(result.statusCode).to.be.equals(201);
            expect(result.response).to.be.an('object').that.is.not.empty;
        });

        it("Retrieve all users", async () => {
            this.timeout(10000);
            const response = await requester.get(`/api/users/`).set('Cookie', `token=${token}`).send();
            const result = response._body
            logger.INFO(JSON.stringify(result.statusCode));
            expect(result.statusCode).to.be.equals(200);
            expect(result.response).to.be.an('array').that.is.not.empty;
            JSON.stringify(randomUser = result.response[result.response.length - 1]);
        });

        it("Update the random user", async () => {
            this.timeout(10000);
            const RandomUser2 = {
                name: "RandomUser2",
                email: "RandomUser2@test.com",
                password: "hola1234",
                role: 0
            };
            const response = await requester.put(`/api/users/${randomUser._id}`).set('Cookie', `token=${token}`).send(RandomUser2);
            const result = response._body
            logger.INFO(JSON.stringify(result.statusCode));
            expect(result.statusCode).to.be.equals(200);
            expect(result.response).to.be.an('object').that.is.not.empty;
        });

        it("Delete the random user", async () => {
            this.timeout(10000);
            const response = await requester.delete(`/api/users/${randomUser._id}`).set('Cookie', `token=${token}`).send();
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });

        it("Sign out admin user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/signout").set('Cookie', `token=${token}`).send();
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });
    });
    describe("Order and User Deletion", function () {

        it("Login the normal user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/login").send({ email: secondUser.email, password: secondUser.password });
            const { headers } = response;
            const result = response._body.statusCode
            secondToken = headers['set-cookie'][0].split('=')[1].split(';')[0]; // Extract the token from the cookie
            logger.INFO(result)
            expect(result).to.be.equals(200);
            expect(token).to.exist;
        });

        it("Check normal user profile", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions").set('Cookie', `token=${secondToken}`).send();
            const result = response._body;
            logger.INFO(result.statusCode);
            expect(result.statusCode).to.be.equals(200);
            expect(result.response.email).to.be.equals(secondUser.email);
            expect(result.response.role).to.be.equals(secondUser.role);
        });

        it("Check the last created order details", async () => {
            this.timeout(10000);
            const response = await requester.get(`/api/orders/${lastOrder._id}`).set('Cookie', `token=${secondToken}`).send();
            const result = response._body
            logger.INFO(JSON.stringify(result.statusCode));
            expect(result.statusCode).to.be.equals(200);
            expect(result.response).to.be.an('object').that.is.not.empty;
        });

        it("Retrieve the normal user's orders", async () => {
            this.timeout(10000);
            const response = await requester.get(`/api/orders/cart/${second_id}`).set('Cookie', `token=${secondToken}`).send();
            const result = response._body
            logger.INFO(JSON.stringify(result.statusCode));
            expect(result.statusCode).to.be.equals(200);
            expect(result.response).to.be.an('array').that.is.not.empty;
        });

        it("Calculate the normal user's total order amount", async () => {
            this.timeout(10000);
            const response = await requester.get(`/api/orders/total/${second_id}`).set('Cookie', `token=${secondToken}`).send();
            const result = response._body
            logger.INFO(JSON.stringify(result.statusCode));
            expect(result.statusCode).to.be.equals(200);
            expect(result.response).to.be.a('number').that.is.above(0);
        });

        it("Update the last created order", async () => {
            this.timeout(10000);
            const orderUpdate = {
                quantity: 5
            };
            const response = await requester.put(`/api/orders/${lastOrder._id}`).set('Cookie', `token=${secondToken}`).send(orderUpdate);
            const result = response._body.statusCode
            logger.INFO(JSON.stringify(result));
            expect(result).to.be.equals(200);
        });

        it("Delete the last created order", async () => {
            this.timeout(10000);
            const response = await requester.delete(`/api/orders/${lastOrder._id}`).set('Cookie', `token=${secondToken}`).send();
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });

        it("Delete the normal user", async () => {
            this.timeout(10000);
            const response = await requester.delete(`/api/users/${second_id}`).set('Cookie', `token=${secondToken}`).send();
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });

        it("Sign out the user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/signout").set('Cookie', `token=${secondToken}`).send();
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });
    });
    describe("Product and Admin Deletion", function () {

        it("Login admin user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/login").send({ email: user.email, password: user.password });
            const { headers } = response;
            const result = response._body.statusCode
            token = headers['set-cookie'][0].split('=')[1].split(';')[0]; // Extract the token from the cookie
            logger.INFO(result)
            expect(result).to.be.equals(200);
            expect(token).to.exist;
        });

        it("Check admin profile", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions").set('Cookie', `token=${token}`).send();
            const result = response._body;
            logger.INFO(result.statusCode);
            expect(result.statusCode).to.be.equals(200);
            expect(result.response.email).to.be.equals(user.email);
            expect(result.response.role).to.be.equals(user.role);
        });

        it("Delete the last created product", async () => {
            this.timeout(10000);
            const response = await requester.delete(`/api/products/${lastProduct._id}`).set('Cookie', `token=${token}`).send();
            const result = response._body.statusCode
            expect(result).to.be.equals(200)
        });

        it("Retrieve the admin user ID by email", async function () {
            this.timeout(10000); // Increase timeout for this specific test to 10 seconds
            const response = await requester.get(`/api/users/email/${user.email}`).set('Cookie', `token=${token}`).send();
            const responseBody = JSON.parse(response.text);
            _id = responseBody.response._id;
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200)
            expect(_id).to.exist;
        });

        it("Delete the admin user", async () => {
            this.timeout(10000);
            const response = await requester.delete(`/api/users/${_id}`).set('Cookie', `token=${token}`);
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });

        it("Sign out admin user", async () => {
            this.timeout(10000);
            const response = await requester.post("/sessions/signout").set('Cookie', `token=${token}`).send();
            const result = response._body.statusCode
            logger.INFO(result)
            expect(result).to.be.equals(200);
        });
    });
});
