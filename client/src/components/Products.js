import React, { useState, useEffect } from 'react';
import axios from 'axios';
import token from './login';
const Products = () => {
    const [Products, setProducts] = useState([]);
    const [editedProducts, setEditedProducts] = useState(Products);

    const handleInputChange = (index, field, value) => {
        const updatedProducts = [...editedProducts];
        updatedProducts[index][field] = value;
        setEditedProducts(updatedProducts);
    };
    useEffect(() => {
        fetch(`http://localhost:3000/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                console.log("product created (or updated) ok");
                setProducts(data);
                setEditedProducts(data);
            })
            .catch((error) => {
                console.error("Error creating/updating product:", error);
            });

    }, []); // Empty array means this effect runs once on mount

    return (
        <div>
            {editedProducts.map((pr, index) => (
                <div className="list-group-item" key={pr._id}>
                    <input
                        type="text"
                        value={pr.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    />
                    <input
                        type="text"
                        value={pr.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    />
                    <input
                        type="number"
                        value={pr.price}
                        onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                    />
                    <input
                        type="number"
                        value={pr.stock}
                        onChange={(e) => handleInputChange(index, 'stock', e.target.value)}
                    />
                    <input
                        type="text"
                        value={pr._id}
                        onChange={(e) => handleInputChange(index, '_id', e.target.value)}
                        disabled // disable editing of _id field
                        hidden={true}
                    />
                    <button
                        onClick={() => {
                            pr.name= editedProducts[index].name;
                            pr.description= editedProducts[index].description;
                            pr.price= editedProducts[index].price;
                            pr.stock= editedProducts[index].stock;
                            //fetch
                            fetch(`http://localhost:3000/editProducts/${pr._id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization:`Bearer ${localStorage.getItem("token")}` ,
                                },
                                body:JSON.stringify({
                                    name: pr.name,
                                    description: pr.description,
                                    price: pr.price,
                                    stock: pr.stock,
                                }),

                            }).then((res) => {
                                return res.json();
                            })
                                .then((data) => {
                                    console.log("product created (or updated) ok");
                                    setProducts(data);
                                    setEditedProducts(data);
                                })
                                .catch((error) => {
                                    console.error("Error creating/updating product:", error);
                                });
                        }}>update </button>
                </div>
            ))}
        </div>
    );
};

export default Products;