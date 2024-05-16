// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";
import Login from "./login";
import Register from "./register";

const HomeLayout = () => {
    return (
            <div>
                <h1>Welcome to our Home Page</h1>
                <NavLink
                    to="/login"
                    className={Login
                    }
                >
                    login
                </NavLink>
                <NavLink
                    to="/register"
                    className={Register}
                >
                    register
                </NavLink>
            </div>
    );
};

export default HomeLayout;