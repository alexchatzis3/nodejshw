const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let productSchema = new Schema({
    product: {
        type: String,
        required: [true, 'Product name is a required field'],
        max: 100,
        unique: true,
        lowercase: true
    },
    cost: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    }

},
{
    collection: 'products',
    timestamps: true
}
);

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);