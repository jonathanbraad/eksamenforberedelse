import React, {useState, useEffect} from 'react';
import facade from "../utils/apiFacade.js";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FindMeals() {

    const [recipes, setRecipes] = useState([])
    const [searchMeals, setSearchMeals] = useState("")

    const [recipe, setRecipe] = useState([])
    const [searchRecipe, setSearchRecipe] = useState("")


    /*List of meals with ingredient */
    const performSearchMeals = (evt) => {
        evt.preventDefault();
        getMeals(searchMeals.ingredient);
    }

    /*Specific recipe */
    const performSearchRecipe = (evt) => {
        evt.preventDefault();
        getRecipe(searchRecipe);
    }

    /*List of meals with ingredient */
    const getMeals = (ingredient) => {
        facade.getMeals(ingredient)
        .then((data) => {
            setRecipes(data);
        })
    }

    /*Specific recipe */
    const getRecipe = (id) => {
        facade.getRecipeById(id)
        .then((data) => {
            setRecipe(data);
        })
    }

    /*List of meals with ingredient */
    const onChangeMeals = (evt) => {
        setSearchMeals({...searchMeals, [evt.target.id]: evt.target.value});
    }

    /*Specific recipe */
    const onChangeRecipe = (evt) => {
        setSearchRecipe({...searchRecipe, [evt.target.id]: evt.target.value});
    }   

    const mealList = recipes?.meals?.map((meal) => (
            <tr key={meal.idMeal}>
                <th>Meal name: {meal.strMeal}</th>
                <th>Meal id: {meal.idMeal}</th>
                <th><button onClick={() => setSearchRecipe(meal.idMeal)}>Select id</button></th>
            </tr>
            ))


    const recipeList = recipe?.meals?.map((recipe) => (
            <p key={recipe.idMeal}>Meal name: {recipe.strMeal} <br></br> Meal id: {recipe.idMeal} <br></br> Category: {recipe.strCategory} <br></br>
             Area: {recipe.strArea} <br></br> Instructions: {recipe.strInstructions} <br></br> Source: {recipe.strSource}</p>
        ))

    const ingredientList = recipe?.meals?.map((recipe) => (
            <p key={recipe.idMeal}>Ingredients: <br></br>{recipe.strIngredient1} {recipe.strMeasure1}<br></br>{recipe.strIngredient2} {recipe.strMeasure2}<br></br>{recipe.strIngredient3} {recipe.strMeasure3}<br></br>
            {recipe.strIngredient4} {recipe.strMeasure4}<br></br>{recipe.strIngredient5} {recipe.strMeasure5}<br></br>{recipe.strIngredient6} {recipe.strMeasure6}<br></br>{recipe.strIngredient7} {recipe.strMeasure7}<br></br>
            {recipe.strIngredient8} {recipe.strMeasure8}<br></br>{recipe.strIngredient9} {recipe.strMeasure9}<br></br>{recipe.strIngredient10} {recipe.strMeasure10}<br></br>{recipe.strIngredient11} {recipe.strMeasure11}<br></br>
            {recipe.strIngredient12} {recipe.strMeasure12}<br></br>{recipe.strIngredient13} {recipe.strMeasure13}<br></br>{recipe.strIngredient14} {recipe.strMeasure14}<br></br>{recipe.strIngredient15} {recipe.strMeasure15}<br></br>
            {recipe.strIngredient16} {recipe.strMeasure16}<br></br>{recipe.strIngredient17} {recipe.strMeasure17}<br></br> {recipe.strIngredient18} {recipe.strMeasure18}<br></br>{recipe.strIngredient19} {recipe.strMeasure19}<br></br>
            {recipe.strIngredient20} {recipe.strMeasure20}<br></br></p>
        ))

    return (
        <Container fluid="md">
            <Row>
                <Col>
                <form>
                    <h3>Meals</h3>
                    <input onChange={onChangeMeals} type="text" placeholder="Search by ingredient" id="ingredient"></input>
                    <button onClick={performSearchMeals} type="submit">Search</button>
                </form>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Meal name: </th>
                        <th>Meal id: </th>
                        <th>Select recipe: </th>
                    </tr>
                </thead>
                <tbody>
                    {mealList}
                </tbody>
            </Table>
                </Col>
                <Col>
                <form>
                    <h3>Recipes by id</h3>
                    <input onChange={onChangeRecipe} type="text" placeholder={searchRecipe} id="id"></input>
                    <button onClick={performSearchRecipe} type="submit">Search</button>
                </form>
                <ul>
                    {recipeList}
                    {ingredientList}
                </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default FindMeals;