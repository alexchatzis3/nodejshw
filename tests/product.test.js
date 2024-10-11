const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../index');

const helpers = require('../services/product.service');


beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(
            () => {console.log("Connetion to Mongo from Jest established")},
            err => {console.log("Failed to connect to Mongo from Jest")}
        )
})

afterEach(async () => {
    await mongoose.connection.close()
})


describe("Tests for /api/products requests", () => {
    it("GET /api/products", async() => {
        const res = await request(app).get("/api/products");

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0)
    }, 10000);

    it("POST /api/products", async() => {
        const res = await request(app).post("/api/products")
            .send({
                product: "product8",
                cost: 70,
                description: "Description for product 8",
                quantity: 8
            });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data).toBeTruthy();
    })

    it("POST /api/products for existing product", async() => {
        const res = await request(app).post("/api/products")
            .send({
                product: "product8",
                cost: 70,
                description: "Description for product 8",
                quantity: 8
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeFalsy();
    })

})

describe("Tests for /api/products/{id}", () => {

    it("GET /api/products/{id}", async() => {
        const result = await helpers.findLastInsertedProduct();
        const res = await request(app)
            .get('/api/products/' + result._id);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data._id).toBe(result._id.toString())
    })

    it("PATCH /api/products/{id}", async() => {
        let result = await helpers.findLastInsertedProduct();
        const res = await request(app)
            .patch('/api/products/' + result._id)
            .send({
                product: "new product8",
                cost: 170,
                description: "Description for new product 8",
                quantity: 18
            });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.product).toBe("new product8");
    })

    it("DELETE /api/products/{id}", async() => {
        const result = await helpers.findLastInsertedProduct();
        const res = await request(app).delete('/api/products/' + result._id);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    })

})


