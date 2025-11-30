// src/components/DeleteEmployee.js
import React, { useState } from 'react';

function DeleteEmployee({referesh_list, setRefreshList}) {
    const [id, setId] = useState('');

    const handleDeleteEmployee = async () => {
        const token = localStorage.getItem('token');  // Retrieve the token
        const response = await fetch(`http://localhost:8000/employees/${id}`, { method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,  // Include token in headers
            },
         });
        if (response.ok) {
            alert("Employee deleted successfully!");
            setId('');
            setRefreshList(!referesh_list)
        } else {
            alert("Failed to delete employee.");
        }
    };

    return (
        <div className="delete-employee">
            <h2>Delete Employee</h2>
            <input type="text" placeholder="Employee ID" value={id} onChange={e => setId(e.target.value)} />
            <button onClick={handleDeleteEmployee}>Delete Employee</button>
        </div>
    );
}

export default DeleteEmployee;
