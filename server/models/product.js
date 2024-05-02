const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the product
const productSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
