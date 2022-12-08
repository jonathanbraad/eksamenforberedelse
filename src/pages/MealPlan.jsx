import React, {useState, useEffect} from 'react';
import facade from "../utils/apiFacade.js";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MealPlan({loginCredentials}) {

    const [recipeId, setRecipeId] = useState("")
    const [day, setDay] = useState("")
    const [type, setType] = useState("")

    const [mealPlanName, setMealPlanName] = useState("")
    const [mealId, setMealId] = useState("")

    const [mealPlans, setMealPlans] = useState([])
    const [meals, setMeals] = useState([])

    const [selectMealPlanId, setSelectMealPlanId] = useState("")
    const [selectMealId, setSelectMealId] = useState("")
    const [selectMealPlanName, setSelectMealPlanName] = useState("")

    useEffect(() => {
        getMealPlans();
    })

    const addMeal = (evt) => {
        evt.preventDefault();
        facade.createMeal(recipeId, day, type);
    }

    const addMealPlan = (evt) => {
        evt.preventDefault();
        facade.createMealPlan(mealPlanName, mealId, loginCredentials.username);
    }

    const updateMeal = (evt) => {
        evt.preventDefault();
        facade.updateMeal(recipeId, day, type, selectMealId)
    }

    const updateMealPlan = (evt) => {
        evt.preventDefault();
        facade.updateMealPlan(mealPlanName, selectMealPlanId, mealId, loginCredentials.username)
    }

    const getMealPlans = () => (
        facade.getAllMealPlans(loginCredentials.username)
        .then((data) => {
            setMealPlans(data);
        })
    )

    const deleteMealPlan = (deleteId) => {
        facade.deleteMealPlan(deleteId)
    }

    const mealPlansTable = mealPlans?.map((mealPlan) => (
        <tr key={mealPlan.id}>
            <th>{mealPlan.id}</th>
            <th>{mealPlan.mealPlanName}</th>
            <th><button onClick={() => setSelectMealPlanName(mealPlan.mealPlanName)}>Select</button></th>
            <th><button onClick={() => setSelectMealPlanId(mealPlan.id)}>Select</button></th>
            <th><button onClick={() => deleteMealPlan(mealPlan.id)}>Delete</button></th>
        </tr>     
    ))

    const getMeals = (evt) => {
        evt.preventDefault();
        facade.getAllMeals(selectMealPlanName)
        .then((data) => {
            setMeals(data);
        })
    }

    const mealsTable = meals?.map((meal) => (
        <tr key={meal.id}>
            <th>{meal.id}</th>
            <th>{meal.recipeId}</th>
            <th>{meal.day}</th>
            <th>{meal.type}</th>
            <th><button onClick={() => setSelectMealId(meal.id)}>Select</button></th>
        </tr>
    ))

    const deleteMeal = (evt) => {
        evt.preventDefault();
        facade.deleteMeal(mealId)
    }


    return (
    <Container fluid="md">
        <Row>
            <Col>
            <form>
                <h3>Add Meal</h3>
                <input onChange={evt => setRecipeId(evt.target.value)} type="number" placeholder="Recipe id"></input><br></br>
                <input onChange={evt => setDay(evt.target.value)} type="text" placeholder="Day"></input><br></br>
                <input onChange={evt => setType(evt.target.value)} type="text" placeholder="Type"></input><br></br>
                <button onClick={addMeal} type="submit">Add</button>
            </form>
            </Col>
            <Col>
            <form>
                <h3>Add Mealplan</h3>
                <input onChange={evt => setMealPlanName(evt.target.value)} type="text" placeholder="Mealplan name"></input><br></br>
                <input onChange={evt => setMealId(evt.target.value)} type="number" placeholder="Add meal"></input><br></br>
                <button onClick={addMealPlan} type="submit">Add</button>
            </form>
            </Col>
            <Col>
            <form>
                <h3>Update Meal</h3>
                <p>Selected meal: {selectMealId}</p>
                <input onChange={evt => setRecipeId(evt.target.value)} type="number" placeholder="Recipe id"></input><br></br>
                <input onChange={evt => setDay(evt.target.value)} type="text" placeholder="Day"></input><br></br>
                <input onChange={evt => setType(evt.target.value)} type="text" placeholder="Type"></input><br></br>
                <button onClick={updateMeal} type="submit">Update</button>
            </form>
            </Col>
            <Col>
            <form>
                <h3>Update Mealplan</h3>
                <p>Selected mealplan: {selectMealPlanId}</p>
                <input onChange={evt => setMealPlanName(evt.target.value)} type="text" placeholder="Mealplan name"></input><br></br>
                <input onChange={evt => setMealId(evt.target.value)} type="number" placeholder="Add meal"></input><br></br>
                <button onClick={updateMealPlan} type="submit">Update</button>
            </form>
            </Col>
        </Row>
        <Row>
            <Col>
            <br></br>
            <button onClick={getMealPlans}>Refresh Mealplans</button>
            <br></br>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id: </th>
                        <th>Name: </th>
                        <th>Select mealplan to view: </th>
                        <th>Select mealplan to update: </th>
                        <th>Delete: </th>
                    </tr>
                </thead>
                <tbody>
                    {mealPlansTable}
                </tbody>
            </Table>
            <p>Selected mealplan: {selectMealPlanName}</p>
            <button onClick={getMeals}>View Meals</button>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id: </th>
                        <th>Recipe Id: </th>
                        <th>Day: </th>
                        <th>Type: </th>
                        <th>Select meal to update: </th>
                    </tr>
                </thead>
                <tbody>
                    {mealsTable}
                </tbody>
            </Table>
            </Col>
        </Row>
    </Container>
    );
}

export default MealPlan;