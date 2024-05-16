// App.js
import React from 'react';
import {BrowserRouter as Router, createBrowserRouter, Route, RouterProvider, Switch} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import HomeLayout from "./components/HomeLayout";




const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        loader: () => import('./components/HomeLayout')
    },
            {
                path: 'login',
                element: <Login />,
                loader: () => import('./components/login')
            },
            {
                path: 'register',
                element: <Register />,
                loader: () => import('./components/register')
            }


]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
