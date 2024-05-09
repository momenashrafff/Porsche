const SECRET = "801f3dbdc8a3d987717c32f1492806bc81e07532d8e5ef0478f4b7f4735812ec159c76c66e049f7510b2556564c2ce2e20ac3ec8ee0161db7de5e6686aaf4fbc"

const mongoose = require('mongoose');
const Admin = require('./models/admin');
const Customer = require('./models/customer');
const Product = require('./models/product');
const Order = require('./models/order');
const bcrypt = require('bcrypt')
const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();

app.use(express.json());

const PORT = 3000; // Change the port number

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Connect to the database
mongoose.connect('mongodb://localhost:27017/PorscheDB');

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Connection error:', error);
});

db.once('open', () => {
    console.log('Connected to PorscheDB');
});

// Add new product
app.post("/addProduct", authenticateAdmin, async (request, response) => {
    try {
        if(
            // need better way to get admin id (createdBy attribute)
            !request.body.name ||
            !request.body.description ||
            !request.body.price ||
            !request.body.stock
        ) {
            return response.status(400).send({
                message: "Send all required fields: name, description, price, stock"
            });
        }
        const admin = await Admin.findById(request.user._id)

        if(admin == null){
           return response.status(501).send("Not authorized")
        }
        const newProduct =  {
            createdBy: admin._id,
            name: request.body.name,
            description: request.body.description,
            price: request.body.price,
            stock: request.body.stock
        }
        const product = await Product.create(newProduct);

        return response.status(201).send(product);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Edit product
app.put('/products/:id', authenticateAdmin, async (request, response) => {
    try {
        if(
            !request.body.name ||
            !request.body.description ||
            !request.body.price ||
            !request.body.stock
        ) {
            return response.status(400).send({
                message: "Send all required fields: name, description, price, stock"
            });
        }

        const { id } = request.params;
        const result = await Product.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({ message: "Product not found" });
        }

        return response.status(200).json({ message: "Product updated successfully"})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Delete product
app.delete('/products/:id', authenticateAdmin, async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Product.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({ message: "Product not found" });
        }

        return response.status(200).send({ message: "Product deleted successfully"})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Omar Part
app.get("/",async (request, response) => {
    const admins = await Admin.find();
    const customers = await Customer.find();
    const products = await Product.find();
    const orders = await Order.find();
    response.json({ admins, customers, products, orders });

});

//get all products
app.get("/products", async (req, res) => {
    try{
 
        res.status(200).send(await Product.find())

    }catch(error){

        res.status(404).send({message: "Product doesn't exist"})

    }
})
//search for a product 
app.get("/findProduct", async (req, res) => {
    try {
        res.status(200).send(await Product.find({"name": req.body.name}))
    }catch(err){
        res.status(404).json('Product not found')
    }
})
//login an already existing user
app.post('/login', async (req, res) => {
    
    const userCustomer = await Customer.findOne({email: req.body.email})
    const userAdmin = await Admin.findOne({email: req.body.email})
    try {
      if(userCustomer == null){
          if(userAdmin == null){
              return res.status(400).send('No such user exists')
          }else {
              if(await bcrypt.compare(req.body.password, userAdmin.password)){
                return res.json({accessToken: jwt.sign(userAdmin.toObject(), SECRET)})
              }else {
                  return res.send('Wrong password')
              }
          }
      }else {
          if(await bcrypt.compare(req.body.password, userCustomer.password)){
            return res.json({accessToken: jwt.sign(userCustomer.toObject(), SECRET)})
          }else {
              return res.send('Wrong password')
          }
      } 
  }

  catch {
      return res.status(500).json('Invalid login attempt')
  }
})
//USE JWT authentication for customers
function authenticateCustomer(req, res, next){
    const auth = req.headers['authorization']

    const token = auth && auth.split(' ')[1]

    if(token == null){
        return res.Status(401)
    }

    jwt.verify(token, SECRET, (err, user) => {
        if(err) return res.Status(403)

        req.user = user
        
        next()
    })
}
//USE JWT authentication for admins
function authenticateAdmin(req, res, next){
    const auth = req.headers['authorization']

    const token = auth && auth.split(' ')[1]

    if(token == null){
        return res.sendStatus(401)
    }

    jwt.verify(token, SECRET, (err, user) => {
        if(err) return res.sendStatus(403)

        req.user = user
        
        next()
    })
}
//Register a new user
app.post('/register', async (req, res) => {
    if(await Admin.findOne({email: req.body.email}) || await Customer.findOne({email: req.body.email})){
        return res.status(500).json('There is another account with this email')
    }
    if(await Admin.findOne({username: req.body.username}) || await Customer.findOne({username: req.body.username})){
        return res.status(500).json('There is another account with this username')
    }

    try {
        const salt = await bcrypt.genSalt()
        
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
        const user = {
             email: req.body.email ,
             password: hashedPassword,
             username: req.body.username,
             firstName: req.body.firstName,
             lastName: req.body.lastName,
             address: req.body.address
            }
        const adminOrNot = req.body.admin
        if(adminOrNot){
           await Admin.create(user)
        }else{ 
           await Customer.create(user)    
        }
        return res.status(200).json('Registration Successful')
    }catch(err) {
        res.status(500).send(err.message)
    }
})
//Get the orders for the customer that is logged in
app.get('/orders', authenticateCustomer , async(req, res) => {
    res.json(await Order.find({customer: req.user._id}))
})
//Place an order for the customer that is logged in
app.post('/placeOrder',authenticateCustomer, async (req, res) => {

    try{
        const products = req.body.products
        let total = 0
        for(let item of products){
            const temporary = await Product.findById(item)
            if(temporary.stock == 0){
                return res.status(500).json(`Item ${temporary.name} is out of stock, failed to place order`)
            }
            await Product.findByIdAndUpdate(item, {stock: temporary.stock - 1}, {new: true})
            total += temporary.price
        }
    const order = {
        customer: req.user._id,
        products: products,
        status: 'pending',
        totalAmount: total,
    } 

    await Order.create(order)
    
    return res.status(200).send('Order placed successfully')

    }catch(err){
        return res.status(500).json(err.message)
    }
})