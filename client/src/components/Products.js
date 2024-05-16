import React, { useState, useEffect } from 'react';
import axios from 'axios';
import token from './login';
const Products = () => {
    const [Products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            const tok = token;
            console.log(localStorage.getItem('token'));
            console.log('hello')

            try {
                const response = await fetch('http://localhost:3000/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tok}` // Include Bearer token in the Authorization header

                    },
                    body: JSON.stringify({})
                });
                console.log(tok);
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Handle successful response
                setProducts(data);
            } catch (error) {
                // Handle error
                console.error('There was a problem with your fetch operation:', error);
            }
        };

        fetchProducts();
    }, []); // Empty array means this effect runs once on mount

    return (
        <div>
            {Products.map((pr) => (
                <div className="list-group-item">
                    <h3>name is {pr.name}</h3>
                    <p>description is {pr.description}</p>
                    <p>price is {pr.price}</p>
                    <p>stock is {pr.stock}</p>
                    <p>id is {pr._id}</p>
                </div>
            ))}
        </div>
    );
};

export default Products;