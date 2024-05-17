// Register.js
import React from 'react';
import {NavLink} from "react-router-dom";
import Products from "./Products";
import Orders from "./Orders";

const Home = () => {
    return (
        <div>
            <h1>Welcome to our CustomerHome Page</h1>
            <NavLink
                to="/home/products"
                className={Products
                }
            >
                view all products
            </NavLink>
            <NavLink
                to="/home/orders"
                className={Orders}
            >
                orders
            </NavLink>
        </div>
    );
};

export default Home;