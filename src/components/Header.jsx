import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css"

function Header({setErrorMsg, loggedIn, setLoggedIn, loginCredentials, setLoginCredentials}) {
    

    return (
        <nav className="topnav">
            <div className="divplacement">
            <NavLink to="/"> Welcome</NavLink>
            <NavLink to="/FindMeals"> Find meals</NavLink>
            {!loggedIn ? (<Login setLoggedIn={setLoggedIn} loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} setErrorMsg={setErrorMsg}  />) :
                (<div>
                    <LoggedIn setLoggedIn={setLoggedIn} loginCredentials={loginCredentials}/>
                    <NavLink to="/MealPlan">Mealplan</NavLink>
                </div>)}
                </div>
        </nav>
    );
}

export default Header;