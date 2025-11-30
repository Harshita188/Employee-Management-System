// src/components/EmployeeList.js
// import React, { useEffect, useState } from 'react';

// function EmployeeList({referesh_list}) {
//     const [employees, setEmployees] = useState([]);

//     useEffect(() => {
//         fetchEmployees();
//     }, [referesh_list]);

//     const fetchEmployees = async () => {
//         const token = localStorage.getItem('token');  // Retrieve the token
//         const response = await fetch('http://localhost:8000/employees', {
//             headers: { 'Authorization': `Bearer ${token}` }  // Add token to the request
//         });
//         const data = await response.json(); //iske baad changes kiye h
//         if (Array.isArray(data)) {
//             setEmployees(data);
//         } else {
//             console.error("Received data is not an array:", data);
//             setEmployees([]);  // Set an empty array if the data is not valid
//         }
    
//        // setEmployees(data);
//     };
    
//     return (
//         <div className="employee-list">
//             <h2>Employee List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Position</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {employees.map(emp => (
//                         <tr key={emp.id}>
//                             <td>{emp.id}</td>
//                             <td>{emp.name}</td>
//                             <td>{emp.position}</td>
//                             <td>{emp.email}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
    

/*
// export default EmployeeList;
import React, { useEffect, useState, useCallback } from 'react';

function EmployeeList({ referesh_list }) {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch Employees Function
    const fetchEmployees = useCallback(async () => {
        const token = localStorage.getItem('token');  // Retrieve the token
        const response = await fetch('http://localhost:8000/employees', {
            headers: { 'Authorization': `Bearer ${token}` }  // Add token to the request
        });
        const data = await response.json();
        if (Array.isArray(data)) {
            setEmployees(data);  // Update state with employee data
        } else {
            console.error("Received data is not an array:", data);
            setEmployees([]);  // Set an empty array if the data is not valid
        }
    }, []); // Only create fetchEmployees once

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees, referesh_list]);

    // Handle Search Query Change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);  // Update search query on change
    };

    // Filter employees based on search query
    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="employee-list">
            <h2>Employee List</h2>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-bar"
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.position}</td>
                            <td>{emp.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
*/
//for using filters commenting this code 

// import React, { useEffect, useState, useCallback } from 'react';

// function EmployeeList({ referesh_list }) {
//     const [employees, setEmployees] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredEmployees, setFilteredEmployees] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);

//     // Fetch Employees Function
//     const fetchEmployees = useCallback(async () => {
//         const token = localStorage.getItem('token');  // Retrieve the token
//         const response = await fetch('http://localhost:8000/employees', {
//             headers: { 'Authorization': `Bearer ${token}` }  // Add token to the request
//         });
//         const data = await response.json();
//         if (Array.isArray(data)) {
//             const sortedEmployees = data.sort((a, b) =>
//                 a.name.localeCompare(b.name)  // Sort alphabetically by name
//             );
//             setEmployees(sortedEmployees);  // Update state with sorted employee data
//         } else {
//             console.error("Received data is not an array:", data);
//             setEmployees([]);  // Set an empty array if the data is not valid
//         }
//     }, []); // Only create fetchEmployees once

//     useEffect(() => {
//         fetchEmployees();
//     }, [fetchEmployees, referesh_list]);

//     // Handle Search Query Change
//     const handleSearchChange = (event) => {
//         const query = event.target.value;
//         setSearchQuery(query);
        
//         if (query) {
//             // Filter employees based on search query and show dropdown
//             const filtered = employees.filter(emp =>
//                 emp.name.toLowerCase().includes(query.toLowerCase())
//             );
//             setFilteredEmployees(filtered);
//             setShowDropdown(true);
//         } else {
//             setShowDropdown(false);
//         }
//     };

//     // Handle Dropdown Selection
//     const handleSelectEmployee = (employeeName) => {
//         setSearchQuery(employeeName);  // Set the search bar to selected employee's name
//         setShowDropdown(false);  // Close the dropdown
//     };

//     return (
//         <div className="employee-list">
//             <h2>Employee List</h2>
//             <input
//                 type="text"
//                 placeholder="Search by name..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 onFocus={() => setShowDropdown(true)}  // Show dropdown when focused
//                 className="search-bar"
//             />
            
//             {/* Dropdown Menu */}
//             {showDropdown && filteredEmployees.length > 0 && (
//                 <ul className="dropdown">
//                     {filteredEmployees.map(emp => (
//                         <li key={emp.id} onClick={() => handleSelectEmployee(emp.name)}>
//                             {emp.name}
//                         </li>
//                     ))}
//                 </ul>
//             )}

//             {/* Employee Table */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Position</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredEmployees.map(emp => (
//                         <tr key={emp.id}>
//                             <td>{emp.id}</td>
//                             <td>{emp.name}</td>
//                             <td>{emp.position}</td>
//                             <td>{emp.email}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default EmployeeList;

import React, { useEffect, useState, useCallback } from 'react';

function EmployeeList({ referesh_list }) {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchQueries, setSearchQueries] = useState({
        id: '',
        name: '',
        position: '',
    });
    const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
    const [sortColumn, setSortColumn] = useState('id'); // Default column to sort by

    // Fetch Employees Function
    const fetchEmployees = useCallback(async () => {
        const token = localStorage.getItem('token');  // Retrieve the token
        const response = await fetch('http://localhost:8000/employees', {
            headers: { 'Authorization': `Bearer ${token}` }  // Add token to the request
        });
        const data = await response.json();
        if (Array.isArray(data)) {
            setEmployees(data);
            setFilteredEmployees(data); // Initially show all employees
        } else {
            console.error("Received data is not an array:", data);
            setEmployees([]);  // Set an empty array if the data is not valid
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees, referesh_list]);

    // Handle Search Query Change for all columns
    const handleSearchChange = (column, event) => {
        const query = event.target.value;
        setSearchQueries(prev => ({
            ...prev,
            [column]: query
        }));
    };

    // Filter and Sort Employees based on search queries and sorting options
    useEffect(() => {
        let filtered = employees.filter(emp => {
            return (
                emp.id.toString().includes(searchQueries.id) &&
                emp.name.toLowerCase().includes(searchQueries.name.toLowerCase()) &&
                emp.position.toLowerCase().includes(searchQueries.position.toLowerCase())
            );
        });

        // Sort employees based on the selected column and order
        filtered = filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[sortColumn] > b[sortColumn] ? 1 : -1;
            } else {
                return a[sortColumn] < b[sortColumn] ? 1 : -1;
            }
        });

        setFilteredEmployees(filtered);
    }, [employees, searchQueries, sortColumn, sortOrder]);

    // Handle Sorting Order Change
    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    // Handle Column Selection for Sorting
    const handleSortColumnChange = (event) => {
        setSortColumn(event.target.value);
    };

    return (
        <div className="employee-list">
            <h2>Employee List</h2>

            {/* Search and Sort Filters */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by ID"
                    value={searchQueries.id}
                    onChange={(e) => handleSearchChange('id', e)}
                />
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchQueries.name}
                    onChange={(e) => handleSearchChange('name', e)}
                />
                <input
                    type="text"
                    placeholder="Search by Position"
                    value={searchQueries.position}
                    onChange={(e) => handleSearchChange('position', e)}
                />

                {/* Sorting Options */}
                <select onChange={handleSortColumnChange} value={sortColumn}>
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                    <option value="position">Position</option>
                </select>
                <select onChange={handleSortOrderChange} value={sortOrder}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* Employee Table */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.position}</td>
                            <td>{emp.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;

