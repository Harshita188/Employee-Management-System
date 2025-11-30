// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate,Link } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import UpdateEmployee from './components/UpdateEmployee';
import DeleteEmployee from './components/DeleteEmployee';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
/*
function App() {
    const [referesh_list, setRefreshList] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <div className="App">
            <h1>Employee Management System</h1>
            <>
            <AddEmployee referesh_list={referesh_list} setRefreshList={setRefreshList} />
            <EmployeeList referesh_list={referesh_list} />
            <UpdateEmployee  referesh_list={referesh_list} setRefreshList={setRefreshList}/>
            <DeleteEmployee  referesh_list={referesh_list} setRefreshList={setRefreshList}/>
            </>
        

        </div>
    );
}*/
/*
function App() {
    const [referesh_list, setRefreshList] = useState(false);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);

    return (
        <div className="App">
            <h1>Employee Management System</h1>
            {loggedIn ? (
                <>
                    <AddEmployee referesh_list={referesh_list} setRefreshList={setRefreshList} />
                    <EmployeeList referesh_list={referesh_list} />
                    <UpdateEmployee referesh_list={referesh_list} setRefreshList={setRefreshList} />
                    <DeleteEmployee referesh_list={referesh_list} setRefreshList={setRefreshList} />
                </>
            ) : (
                <>
                    <Register />
                    <Login setLoggedIn={setLoggedIn} />
                </>
            )}
        </div>
    );
}*/
// react router dom install karne k baad k changes to set login button commented below code
// function App() {
//     const [refreshList, setRefreshList] = useState(false);
//     const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
//     const [registered, setRegistered] = useState(false); // Track registration status

//     useEffect(() => {
//         // Check if the token is present in localStorage on page load
//         const token = localStorage.getItem('token');
//         if (token) {
//             setLoggedIn(true);
//         } else {
//             setLoggedIn(false);
//         }
//     }, []);

//     return (
//         <div className="App">
//             <h1>Employee Management System</h1>
//             {loggedIn ? (
//                 <>
//                     {/* CRUD operations only if logged in */}
//                     <AddEmployee referesh_list={refreshList} setRefreshList={setRefreshList} />
//                     <EmployeeList referesh_list={refreshList} />
//                     <UpdateEmployee referesh_list={refreshList} setRefreshList={setRefreshList} />
//                     <DeleteEmployee referesh_list={refreshList} setRefreshList={setRefreshList} />
//                 </>
//             ) : (
//                 <>
//                     {/* Show Register page first, then Login after registration */}
//                     {!registered ? (
//                         <Register setRegistered={setRegistered} />
//                     ) : (
//                         <Login setLoggedIn={setLoggedIn} />
//                     )}
//                 </>
//             )}
//         </div>
//     );
// }
//login button set karne ke liye taki user directly login kar sake 
function App() {
    const [refreshList, setRefreshList] = useState(false);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
    const [registered, setRegistered] = useState(false); // Track registration status

    useEffect(() => {
        // Check if the token is present in localStorage on page load
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <h1>Employee Management System</h1>
                {loggedIn ? (
                    <>
                    {/* Main Menu for logged-in users */}
                    <Routes>
                        <Route path="/" element={<Navigate to="/menu" />} />
                        <Route path="/menu" element={<MainMenu />} />
                        <Route path="/add-employee" element={<AddEmployee refreshList={refreshList} setRefreshList={setRefreshList} />} />
                        <Route path="/update-employee" element={<UpdateEmployee refreshList={refreshList} setRefreshList={setRefreshList} />} />
                        <Route path="/delete-employee" element={<DeleteEmployee refreshList={refreshList} setRefreshList={setRefreshList} />} />
                        <Route path="/employee-list" element={<EmployeeList refreshList={refreshList} />} />
                    </Routes>
                </>
                    // <>
                    //     {/* CRUD operations only if logged in */}
                    //     <AddEmployee refreshList={refreshList} setRefreshList={setRefreshList} />
                    //     <EmployeeList refreshList={refreshList} />
                    //     <UpdateEmployee refreshList={refreshList} setRefreshList={setRefreshList} />
                    //     <DeleteEmployee refreshList={refreshList} setRefreshList={setRefreshList} />
                    // </>
                ) : (
                    <>
                        {/* Show Register page first, then Login after registration */}
                        <Routes>
                        <Route path="/" element={<Navigate to="/register" />} /> {/* Redirect to /register */}
                            <Route 
                                path="/register" 
                                element={<Register setRegistered={setRegistered} />} 
                            />
                            <Route 
                                path="/login" 
                                element={<Login setLoggedIn={setLoggedIn} />} 
                            />
                        </Routes>

                        {!registered ? (
                            <div>
                                <p>Don't have an account? <a href="/register">Register here</a></p>
                            </div>
                        ) : (
                            <div>
                                <p>Successfully registered! Please <a href="/login">login here</a></p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Router>
    );
}
//for making diff pages for each crud operation
function MainMenu() {
    return (
        <div className="main-menu">
            <h2>Main Operations</h2>
            <Link to="/add-employee"><button>Add Employee</button></Link>
            <Link to="/update-employee"><button>Update Employee</button></Link>
            <Link to="/delete-employee"><button>Delete Employee</button></Link>
            <Link to="/employee-list"><button>Employee List</button></Link>
        </div>
    );
}


export default App;
