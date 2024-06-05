import assert from "assert"
import dao from "../../src/data/index.factory.js"
import logger from "../../src/utils/logger/logger.factory.js"
const { products } = dao

describe(
    "products testing", () => {
        const model = products
        const data = { name: 'remera', place: 'Lugar de origen', img: "https://example.com/image.jpg" }
        let id
        it("product creation requires 'name' property",
            () => {
                assert.ok(data.name)
            }
        )
        it("product creation does not require 'price' property",
            () => {
                assert.strictEqual(data.price, undefined)
            }
        )
        it(
            "product create function returns object with 'id' property",
            async () => {
                const one = await model.create(data)
                id = one.id
                assert.ok(one.id)
            }
        )
        it("product read function returns an array of objects with 'id' property", async () => {
            const all = await model.read({ filter: { place: "Lugar de origen" }, sort: { stock: -1 } });

            // Check if the result is an object
            assert.strictEqual(typeof all, 'object');


            // Assert that the object has data
            if (Object.keys(all).length > 0) {
                // Check for '_id' property in each object
                Object.values(all).forEach(product => {
                    assert.ok(product.id);
                });
            } else {
                logger.INFO('The object is empty');
            }
        });
        it(
            "product update function returns object with new property",
            async () => {
                const before = await model.readOne(id)
                const one = await model.update(id, { name: 'pantalon' });
                assert.strictEqual(before.name === one.name, false)
            }
        )
        it(
            "product destroy function destroys product by 'id' property",
            async () => {
                const one = await model.destroy(id);
                const after = await model.readOne(id)
                assert.strictEqual(after, undefined);
            }
        )
    })

