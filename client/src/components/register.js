// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [sec, setSec] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(username === '' || password === '' || email === '' || firstName === '' || lastName === '' || address === ''){
            console.log('Please fill in all fields')
            return
        }
        //email, password, username, firstName, lastName, address
        const requestBody = {
            email: email,
            password: password,
            username: username,
            firstName: firstName,
            lastName: lastName,
            address: address,
            admin: sec
        };
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            // if (!response.ok) {
            //     throw new Error(JSON.stringify(response.json()));
            // }
            const data = await response.json();
            // Handle successful response
            console.log(data);
            // Redirect to the '/login' route
            navigate('/login')
        } catch (error) {
            // Handle error
            console.error('There was a problem with your fetch operation:', error);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
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
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <input
                type="password"
                placeholder="secret key"
                value={sec}
                onChange={(e) => setSec(e.target.value)}
            />
            <button type="submit">Register</button>

        </form>
    );
};

export default Register;