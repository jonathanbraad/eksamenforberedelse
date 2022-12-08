import React from 'react';

function ViewMeals(props) {

    return (
        <div className="divplacement">
            <h3>Mealplans for: </h3>
            <form>
                <input type="text" placeholder="Enter user" id="username"/>{" "}
                <button type="submit">Search user</button>
            </form>
        </div>
    );
}

export default ViewMeals;