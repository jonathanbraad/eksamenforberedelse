import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function ViewMeals(props) {

    return (
        <div className="divplacement">
            <h3>Mealplans for: </h3>
            <form>
                <input type="text" placeholder="Enter user" id="username"/>{" "}
                <button type="submit">Search user</button>
            </form>
            <ListGroup>
                <ListGroup.Item>Mealplan 1</ListGroup.Item>
                <ListGroup.Item>Mealplan 2</ListGroup.Item>
                <ListGroup.Item>Mealplan 3...</ListGroup.Item>

            </ListGroup>
        </div>
    );
}

export default ViewMeals;