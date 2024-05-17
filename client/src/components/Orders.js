import React, {useEffect, useState} from 'react';

const OrdersComponent = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from the first API endpoint
        fetch('http://localhost:3000/orders', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const fetchProductDetails = async (productId) => {
        // Fetch product details from the second API endpoint using productId
        try {
            const response = await fetch(`your_products_api_endpoint/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching product details:', error);
            return null;
        }
    };

    const fetchAllProductDetails = async (order) => {
        // Iterate through each product ID in the order and fetch its details
        return await Promise.all(order.products.map(async productId => {
            return await fetchProductDetails(productId);
        }));
    };

    return (
        <div>
            {orders.map(order => (
                <div key={order.id}>
                    <h2>Order ID: {order._id}</h2>
                    <ul>
                        {order.products.map(productId => (
                            <li key={productId._id}>
                                {/* Fetch and display each product detail */}
                                <ProductDetails productId={productId} />
                            </li>
                        ))}
                    </ul>
                    <p>total: {order.totalAmount}</p>
                    <p>status: {order.status}</p>

                </div>
            ))}
        </div>
    );
};

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState({ name: 'a', description: 'a', stock: 0, price: 0});

    useEffect(() => {
        // Fetch product details when component mounts
        fetchProductDetails(productId);
        console.log(productId);
    }, [productId]);

    const fetchProductDetails = async (productId) => {
        // Fetch product details from the API endpoint using productId
        try {
            const response = await fetch(`http://localhost:3000/product/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const productDetails = await response.json();
            setProduct(productDetails);
            console.log(productDetails);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };


    return (
        <div>
            {/* Product Name */}
            <h3>{product.name}</h3>
            {/* Product Description */}
            <p>Description: {product.description}</p>
            {/* Product Stock */}
            <p>Stock: {product.stock}</p>
            {/* Product Price */}
            <p>Price: {product.price}</p>
        </div>
    );
};

export default OrdersComponent;