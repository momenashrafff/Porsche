// Register.js
import React from 'react';
import {NavLink} from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Products from "./Products";

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
            {/*<NavLink*/}
            {/*    to="/home/findproducts"*/}
            {/*    className={Register}*/}
            {/*>*/}
            {/*    find products*/}
            {/*</NavLink>*/}
        </div>
    );
};

export default Home;