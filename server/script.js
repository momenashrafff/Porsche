const mongoose = require('mongoose');
const Admin = require('./models/admin');
const Customer = require('./models/customer');
const Product = require('./models/product');
const Order = require('./models/order');


// Connect to the database
mongoose.connect('mongodb://localhost:27017/PorscheDB');

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Connection error:', error);
});

db.once('open', () => {
    console.log('Connected to PorscheDB');
});


async function run() {
    try {
        // Create an admin
        const adminData = {
            username: 'admin',
            password: 'admin',
            email: 'admin@test.com',
            firstName: 'Admin',
            lastName: 'User',
        };

        const newAdmin = await Admin.create(adminData);
        console.log('Admin created:', newAdmin);

        // Create customers
        const customerData = [
            {
                username: 'customer1',
                password: 'customer1',
                email: 'customer1@test.com',
                firstName: 'John',
                lastName: 'Doe',
                address: '123 Main St'
            },
            {
                username: 'customer2',
                password: 'customer2',
                email: 'customer2@test.com',
                firstName: 'Jane',
                lastName: 'Smith', 
                address: '456 Elm St'
            }
        ];

        for (let i = 0; i < customerData.length; i++) {
            const newCustomer = await Customer.create(customerData[i]);
            console.log('Customer created:', newCustomer);
        }

        // Create Porsche cars
        const porscheCarsData = [
            {
                createdBy: newAdmin._id,
                name: '911',
                description: 'Red sports car',
                price: 150000,
                stock: 5
            },
            {
                createdBy: newAdmin._id,
                name: 'Taycan',
                description: 'Electric sedan',
                price: 120000,
                stock: 10
            },
            {
                createdBy: newAdmin._id,
                name: 'Cayenne',
                description: 'Luxury SUV',
                price: 100000,
                stock: 8
            }
        ];

        for (let i = 0; i < porscheCarsData.length; i++) {
            const newCar = await Product.create(porscheCarsData[i]);
            console.log('Porsche car created:', newCar);
        }

        const customers = await Customer.find().limit(2);
        const products = await Product.find().limit(3);

        // Create orders
        const ordersData = [
            {
                customer: customers[0]._id,
                products: [products[0]._id, products[1]._id],
                status: 'pending',
                totalAmount: products[0].price + products[1].price 
            },
            {
                customer: customers[1]._id,
                products: [products[1]._id, products[2]._id],
                status: 'pending',
                totalAmount: products[1].price + products[2].price
            }
        ];

        for (let i = 0; i < ordersData.length; i++) {
            const newOrder = await Order.create(ordersData[i]);
            console.log('Order created:', newOrder);
        }
    } catch (error) {
        console.error(error.message);
    }
}

// display all the users in the database
async function displayUsers() {
    try {
        const admins = await Admin.find();
        console.log('Admins:', admins);

        const customers = await Customer.find();
        console.log('Customers:', customers);

        const products = await Product.find();
        console.log('Products:', products);
    } catch (error) {
        console.error(error.message);
    }
}

run();
displayUsers();
