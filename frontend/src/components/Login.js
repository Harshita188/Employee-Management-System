/*import React, { useState } from 'react';

function Login({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8000/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password })
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            setLoggedIn(true);
            alert("Login successful!");
        } else {
            alert("Failed to login.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
*/
// Login.js
import React, { useState } from 'react';
//for fixing reidrect issue in menu page
import { useNavigate } from 'react-router-dom';


function Login({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //for fixing reidrect issue in menu page
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Construct form data
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        try {
            const response = await fetch('http://localhost:8000/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString(),
               // headers: { 'Content-Type': 'application/json' },
               // body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token); // Store token in localStorage
                setLoggedIn(true); // Successful login
                //for fixing reidrect issue in menu page
                navigate('/menu');  // Redirect to the menu page
            } else {
                alert("Login failed. Check your username and password.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-container">
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
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
        </div>
    );
}

export default Login;
