// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

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
            if(data==="There is another account with this email"){
                alert("There is another account with this email");
                return;
            }
            if(data==="There is another account with this username"){
                alert("There is another account with this username");
                return;
            }
            if(data==="Not authorized"){
                alert("Not authorized");
                return;
            }
            if(data==="Registration Successful"){
                alert("Registration Successful");
            }
            console.log(data);
            // Redirect to the '/login' route
            navigate('/login')
        } catch (error) {
            // Handle error
            console.error('There was a problem with your fetch operation:', error);
        }

    };

    return (
        <div className="container1">
            <div className="top1"></div>
            <div className="bottom1"></div>
            <div className="center1">
                <h1 className='porsche1'>Porsche</h1>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="email" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type="password" placeholder="Secret Key" value={sec} onChange={(e) => setSec(e.target.value)} />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;