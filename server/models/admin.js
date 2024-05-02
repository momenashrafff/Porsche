const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the admin
const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

// Create a model for the admin
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;