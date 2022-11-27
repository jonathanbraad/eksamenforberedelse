import React, {useState, useEffect} from 'react';
import facade from "../utils/apiFacade.js";

function AnimalFacts() {

    const [facts, setFacts] = useState([])

    function getFacts() {
        facade.getFacts()
        .then((data) => {
            setFacts(data);
        })
    }

    return (
        <div className="divplacement">
            <h3>Recipes</h3>
            <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search by ingredient"></input>
            <button onClick={getFacts} type="submit">Search</button>          
        </div>
    );
}

export default AnimalFacts;