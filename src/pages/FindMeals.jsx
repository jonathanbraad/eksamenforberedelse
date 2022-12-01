import React, {useState, useEffect} from 'react';
import facade from "../utils/apiFacade.js";

function FindMeals() {

    const [recipes, setRecipes] = useState([])
    const [search, setSearch] = useState("")

    const performSearch = (evt) => {
        evt.preventDefault();
        getMeals(search.ingredient);
    }

    const getMeals = (ingredient) => {
        facade.getMeals(ingredient)
        .then((data) => {
            setRecipes(data);
        })
    }

    const onChange = (evt) => {
        setSearch({...search, [evt.target.id]: evt.target.value});
    }

    const mealList = recipes?.meals?.map((meal) => (
                <li key={meal.idMeal}>Meal name: {meal.strMeal} Meal id: {meal.idMeal}</li>
            ))

    return (
        <div className="divplacement">
            <form>
                <h3>Recipes</h3>
                <input onChange={onChange} type="text" placeholder="Search by ingredient" id="ingredient"></input>
                <button onClick={performSearch} type="submit">Search</button>
            </form>
            <ul>
                {mealList}
            </ul>   
        </div>
    );
}

export default FindMeals;