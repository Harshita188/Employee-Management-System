// src/components/AddEmployee.js
import React, { useState } from 'react';

function AddEmployee({referesh_list, setRefreshList}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');

    const handleAddEmployee = async () => {
        const token = localStorage.getItem('token');  // Retrieve the token
        const response = await fetch('http://localhost:8000/employees', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Add the token here

             },
            body: JSON.stringify({ name, email, position })
        });
        if (response.ok) {
            alert("Employee added successfully!");
            setName(''); setEmail(''); setPosition('');
            setRefreshList(!referesh_list)
        } else {
            alert("Failed to add employee.");
        }
    };
    
    return (
        <div className="add-employee">
            <h2>Add Employee</h2>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} />
            <button onClick={handleAddEmployee}>Add Employee</button>
        </div>
    );
}

export default AddEmployee;

