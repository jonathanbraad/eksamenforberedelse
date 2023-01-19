import React, {useState, useEffect} from 'react';
import facade from "../utils/apiFacade.js";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ViewRentals(props) {

    const [Rentals, setRentals] = useState([])
    const [House, setHouse] = useState("")

    function getRentalsByTenant() {
        facade.getRentalByTenant(1)
            .then((data) => {
                setRentals(data);
            })
    }

    function getHouseByRental() {
        facade.getHouseByRental(1)
            .then((data) => {
            setHouse(data);

        })
    }


    return (
        <div className="divplacement">
            <h3>Animal Facts</h3>
            <p>House: {House}</p>

            <button onClick={getHouseByRental} type="submit">Get House from Rental</button>
        </div>
    );
}

export default ViewRentals;