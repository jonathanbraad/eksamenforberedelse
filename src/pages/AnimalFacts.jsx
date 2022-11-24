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
            <h3>Animal Facts</h3>
            <p>Cat fact: {facts.catFact}</p>
            <p>Dog fact: {facts.dogFact}</p>
            <button onClick={getFacts} type="submit">Get new facts</button>          
        </div>
    );
}

export default AnimalFacts;