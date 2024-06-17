import dao from "../../src/data/index.factory.js"
import logger from "../../src/utils/logger/logger.factory.js"
import { expect, assert } from 'chai'
const { products } = dao

describe("products testing", () => {
    const model = products
    const data = { name: 'remera', place: 'Lugar de origen', img: "https://example.com/image.jpg" }
    let id

    it("product creation requires 'name' property", () => {
        expect(data).to.have.property('name')
    })

    it("product creation does not require 'price' property", () => {
        expect(data).to.not.have.property('price')
    })

    it("product create function returns object with 'id' property", async () => {
        const one = await model.create(data)
        id = one.id
        expect(one).to.have.property('id')
    })

    it("product read function returns an array of objects with 'id' property", async () => {
        const all = await model.read({ filter: { place: "Lugar de origen" }, sort: { stock: -1 } });

        // Check if the result is an array and that the array has elements
        expect(all).to.be.an('array').and.to.have.length.greaterThan(0);

        // Check for 'id' property in each object
        all.forEach(product => {
            expect(product).to.have.property('id');
        });
    });

    it("product update function returns object with new property", async () => {
        const before = await model.readOne(id)
        const one = await model.update(id, { name: 'pantalon' });
        expect(before.name).to.not.equal(one.name)
    })

    it("product destroy function destroys product by 'id' property", async () => {
        await model.destroy(id);
        const after = await model.readOne(id)
        expect(after).to.be.undefined;
    })
})
