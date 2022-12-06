import React, {useState, useEffect} from 'react';
import facade from "../utils/apiFacade.js";

function CreateMealPlan({loginCredentials}) {

    const [recipeId, setRecipeId] = useState("")
    const [day, setDay] = useState("")
    const [type, setType] = useState("")

    const [mealPlanName, setMealPlanName] = useState("")
    const [mealId, setMealId] = useState("")

    const addMeal = (evt) => {
        evt.preventDefault();
        facade.createMeal(recipeId, day, type);
    }

    const addMealPlan = (evt) => {
        evt.preventDefault();
        facade.createMealPlan(mealPlanName, mealId, loginCredentials.username);
    }

    return (
        <div className="divplacement">
            <form>
                <h3>Add meal</h3>
                <input onChange={evt => setRecipeId(evt.target.value)} type="number" placeholder="Recipe id"></input><br></br>
                <input onChange={evt => setDay(evt.target.value)} type="text" placeholder="Day"></input><br></br>
                <input onChange={evt => setType(evt.target.value)} type="text" placeholder="Type"></input><br></br>
                <button onClick={addMeal} type="submit">Add</button>
            </form>
            <form>
                <h3>Create mealplan</h3>
                <input onChange={evt => setMealPlanName(evt.target.value)} type="text" placeholder="Mealplan name"></input><br></br>
                <input onChange={evt => setMealId(evt.target.value)} type="number" placeholder="Add meal"></input><br></br>
                <button onClick={addMealPlan} type="submit">Add</button>
            </form>
        </div>
    );
}

export default CreateMealPlan;