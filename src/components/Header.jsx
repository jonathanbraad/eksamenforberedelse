import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import CreateMealPlan from '../pages/CreateMealPlan.jsx';
import "../styles/header.css"

function Header({setErrorMsg, loggedIn, setLoggedIn, loginCredentials, setLoginCredentials}) {
    

    return (
        <nav className="topnav">
            <div className="divplacement">
                <NavLink to="/ViewMeals"> View Meals </NavLink>
            <NavLink to="/"> Welcome</NavLink>
            <NavLink to="/FindMeals"> Find meals</NavLink>
            {!loggedIn ? (<Login setLoggedIn={setLoggedIn} loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} setErrorMsg={setErrorMsg}  />) :
                (<div>
                    <LoggedIn setLoggedIn={setLoggedIn} loginCredentials={loginCredentials}/>
                    <NavLink to="/CreateMealPlan" > Create mealplan</NavLink>
                </div>)}
                </div>
        </nav>
    );
}

export default Header;