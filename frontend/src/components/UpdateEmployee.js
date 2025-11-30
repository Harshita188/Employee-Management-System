// src/components/UpdateEmployee.js
import React, { useState } from 'react';

function UpdateEmployee({referesh_list, setRefreshList}) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');

    const handleUpdateEmployee = async () => {
        const token = localStorage.getItem('token');  // Retrieve the token
        const response = await fetch(`http://localhost:8000/employees/${id}`, {
            method: 'PUT',
            headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`,  // Include token in headers
                 },
            body: JSON.stringify({ name, email, position })
        });
        if (response.ok) {
            alert("Employee updated successfully!");
            setId(''); setName(''); setEmail(''); setPosition('');
            setRefreshList(!referesh_list)
        } else {
            alert("Failed to update employee.");
        }
    };

    return (
        <div className="update-employee">
            <h2>Update Employee</h2>
            <input type="text" placeholder="Employee ID" value={id} onChange={e => setId(e.target.value)} />
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} />
            <button onClick={handleUpdateEmployee}>Update Employee</button>
        </div>
    );
}

export default UpdateEmployee;
