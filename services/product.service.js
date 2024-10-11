const Product = require('../models/product.model');

async function findLastInsertedProduct() {
    console.log("Find last inserted product");

    try {
        const result = await Product.findOne({}).sort({_id:-1});
        return result
    }catch(err) {
        console.log("Problem in finding last inserted product");
    }
};

module.exports = {findLastInsertedProduct};