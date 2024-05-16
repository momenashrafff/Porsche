import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            email: username,
            password: password
        };
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // Include Bearer token in the Authorization header

                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error(response);
            }
            const data = await response.json();
            // Handle successful response
            if(data.admin) {
                loggedd = 'admin';
            }else{
                loggedd = 'customer';
            }
            token = JSON.stringify(data.accessToken);
            localStorage.setItem('token', JSON.stringify(data.accessToken));

            console.log(token);
            navigate('/home');
            console.log(data);
        } catch (error) {
            // Handle error
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

// Wrap the Login component with withRouter to access history object
export default Login;
export let loggedd = '';
export let token = '';
