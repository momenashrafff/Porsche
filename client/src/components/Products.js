import React, { useState, useEffect } from 'react';
import './Product.css';

const Products = () => {
    const [Products, setProducts] = useState([]);
    const [editedProducts, setEditedProducts] = useState(Products);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };
    const handleInputChange = (index, field, value) => {
        const updatedProducts = [...editedProducts];
        updatedProducts[index][field] = value;
        setEditedProducts(updatedProducts);
    };
    const handleSubmit =  (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/addProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                stock: stock,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Product updated successfully:", data);
                // Update state with new product data
                window.location.reload();

            })
            .catch((error) => {
                console.error("Error updating product:", error);
            });
    }
    const handleSubmitSearch =  (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/findProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
                name: nameSearch
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                console.log("product:", data);
                // Update state with new product data
                //display the products
                document.getElementById('field1').value = data[0].name;
                document.getElementById('field2').value = data[0].description;
                document.getElementById('field3').value = data[0].price;
                document.getElementById('field4').value = data[0].stock;


            })
            .catch((error) => {
                console.error("Error updating product:", error);
            });
    }
    useEffect(() => {
        console.log(localStorage.getItem("token"));
        fetch(`http://localhost:3000/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
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
        <div className="wrapper-product">
            <h1>Products</h1>
            {editedProducts.map((pr, index) => (
                <div className="list-group-item-product" key={pr._id}>
                    <img
                        className="image-product"
                        src="https://scontent.fcai20-5.fna.fbcdn.net/v/t39.30808-6/254248292_4488945131218539_3594380631839996416_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XvID3PVXSnYQ7kNvgEUWv6u&_nc_ht=scontent.fcai20-5.fna&oh=00_AYA2kYf3sfJybqMcOjb_jR-Vbb6a-aIIlAwUklaHmwt7Xg&oe=664D347D"
                        alt="product image"
                    />
                    <label className="label-product">Name</label>
                    <input
                        className="input-product"
                        type="text"
                        value={pr.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    />
                    <label className="label-product">Description</label>
                    <input
                        className="input-product"
                        type="text"
                        value={pr.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    />
                    <label className="label-product">Price</label>
                    <input
                        className="input-product"
                        type="number"
                        value={pr.price}
                        onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                    />
                    <label className="label-product">Stock</label>
                    <input
                        className="input-product"
                        type="number"
                        value={pr.stock}
                        onChange={(e) => handleInputChange(index, 'stock', e.target.value)}
                    />
                    <input
                        className="input-product"
                        type="text"
                        value={pr._id}
                        onChange={(e) => handleInputChange(index, '_id', e.target.value)}
                        disabled // disable editing of _id field
                        hidden={true}
                    />
                    {localStorage.getItem("isAdmin") === "true" &&
                    <button className='update'
                            onClick={() => {
                                // Update product properties from editedProducts
                                pr.name = editedProducts[index].name;
                                pr.description = editedProducts[index].description;
                                pr.price = editedProducts[index].price;
                                pr.stock = editedProducts[index].stock;

                                // Send updated product data to the server
                                fetch(`http://localhost:3000/editProducts/${pr._id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: localStorage.getItem("token"),
                                    },
                                    body: JSON.stringify({
                                        name: pr.name,
                                        description: pr.description,
                                        price: pr.price,
                                        stock: pr.stock,
                                    }),
                                })
                                    .then((res) => {
                                        if (!res.ok) {
                                            throw new Error("Network response was not ok");
                                        }
                                        return res.json();
                                    })
                                    .then((data) => {
                                        console.log("Product updated successfully:", data);
                                        // Update state with new product data
                                    })
                                    .catch((error) => {
                                        console.error("Error updating product:", error);
                                    });
                            }}>Update</button>
                            }
                    
                    {localStorage.getItem("isAdmin") === "true" &&
                        <button
                        onClick={() => {
                            // Update product properties from editedProducts
                            pr.name = editedProducts[index].name;
                            pr.description = editedProducts[index].description;
                            pr.price = editedProducts[index].price;
                            pr.stock = editedProducts[index].stock;

                            // Send updated product data to the server
                            fetch(`http://localhost:3000/deleteProducts/${pr._id}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: localStorage.getItem("token"),
                                }
                            })
                                .then((res) => {
                                    if (!res.ok) {
                                        throw new Error("Network response was not ok");
                                    }
                                    return res.json();
                                })
                                .then((data) => {
                                    console.log("Product updated successfully:", data);
                                    // Update state with new product data
                                    window.location.reload();
                                })
                                .catch((error) => {
                                    console.error("Error updating product:", error);
                                });
                        }}>Delete</button>}
                        {localStorage.getItem("isAdmin") === "false" &&
                        <button
                        onClick={() => {
                            addToCart(pr);
                        }}>add to kart</button>
                    }

                </div>

            ))}
            {localStorage.getItem("isAdmin") === "true" &&
            <form className="adding" onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label>Stock</label>
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <button type="submit">add</button>

            </form>
}
            <form className="adding1" onSubmit={handleSubmitSearch} >
                <input
                    type="text"
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                />
                <button type="submit">search</button>
            </form>
            <div>
                <input
                    type="text"
                    id="field1"
                    placeholder="field1"
                />
                <input
                    type="text"
                    id="field2"
                    placeholder="field2"
                />
                <input
                    type="number"
                    id="field3"
                    placeholder="field3"
                />
                <input
                    type="number"
                    id="field4"
                    placeholder="field4"
                />
            </div>
            {localStorage.getItem("isAdmin") === "false" &&
            <p>kart: </p>
}
            {cartItems.map((item, index) => (
                <ul>
                    <li key={index}>{item.name} - {item.price}</li>
                    <li key={index}>{item.description}</li>
                </ul>
            ))}
            {localStorage.getItem("isAdmin") === "false" &&
            <button
                onClick={() => {
                    const idsArray = cartItems.map(product => product._id);

                    fetch(`http://localhost:3000/placeOrder`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token"),
                        },
                        body: JSON.stringify({
                            products: idsArray,
                        }),
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error("Network response was not ok");
                            }
                            return res.json();
                        })
                        .then((data) => {
                            console.log("added order:", data);
                            setCartItems([])
                            // Update state with new product data
                            window.location.reload();
                        })
                        .catch((error) => {
                            setCartItems([])
                            console.error("Error updating product:", error);
                        });
                }}>place order</button>
            }

        </div>
    );
};

export default Products;