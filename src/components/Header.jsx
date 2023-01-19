import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css"

function Header({setErrorMsg, loggedIn, setLoggedIn, loginCredentials, setLoginCredentials}) {
    

    return (
        <nav className="topnav">
            <div className="divplacement">
                <NavLink to="/ViewRentals">ViewRentals</NavLink>
            <NavLink to="/"> Welcome</NavLink>
                </div>
        </nav>
    );
}

export default Header;