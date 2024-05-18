// Register.js
import React from 'react';
import {NavLink} from "react-router-dom";
import Products from "./Products";
import Orders from "./Orders";
import './Home.css';
import Image1 from './assets/porsche1.jpg';
import Image2 from './assets/porsche2.avif';
import Image3 from './assets/porsche3.avif';
const Home = () => {
    return (
        <div className="backo">
        <div className="wrapper2">
            <div className="container2">
            <h1>Welcome to our CustomerHome Page</h1>
            <NavLink
                to="/home/products"
                className={Products
                }
            >
                view all products
            </NavLink>
            {localStorage.getItem("isAdmin") === "false" && 
            <NavLink
                to="/home/orders"
                className={Orders}
            >
                orders
            </NavLink>
            }
            </div>
        </div>
        </div>
    );
};

export default Home;