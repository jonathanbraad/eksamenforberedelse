const URL = "http://localhost:8081/Eksamensprojekt_war_exploded";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({status: res.status, fullError: res.json()})
    }
    return res.json();
} 

function apiFacade() {

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }

    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }

    const loggedIn = () => {
        return getToken() != null;
    }

    const logout = () => {
        localStorage.removeItem("jwtToken");
    }

    const login = (user, password) => {
        const options = makeOptions("POST", true, {username: user, password: password});
        return fetch(URL + "/api/login", options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
            })
    }

    const fetchData = () => {
        const options = makeOptions("GET", true);
        return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }

    function makeOptions(method, addToken, body) {
        method = method ? method : 'GET';
        const opts = {
            method: method,
            headers: {
                ...(['PUT', 'POST'].includes(method) && {
                    "Content-type": "application/json"
                }),
                "Accept": "application/json"
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    function getRentalByTenant(id) {
        return fetchURL(URL + "/api/tenant/viewRental/" + id)
    }

    function getHouseByRental(id) {
        return fetchURL(URL + "/api/tenant/viewHouseFromRental/" + id)
    }

    function fetchURL(URL, data) {
        return fetch(URL, data)
          .then((response) => response.json())
          .then((data) => {return data})
      }

    function getFacts() {
        return fetchURL(URL+"/api/facts")
      }
    
    function getCatFacts() {
        return fetchURL(URL+"/api/facts/cat")
    }

    function getDogFacts() {
        return fetchURL(URL+"/api/facts/dog")
    }

    function getMeals(ingredient){
        return fetchURL(URL+"/api/search/meals/"+ingredient)
    }

    function getRecipeByName(name){
        return fetchURL(URL+"/api/search/recipe/name/"+name)
    }

    function getRecipeById(id){
        return fetchURL(URL+"/api/search/recipe/id/"+id)
    }

    function getAllMealPlans(username){
        return fetchURL(URL+"/api/mealplan/getall/"+username)
    }   

    const createMealPlan = (mealPlanName, username) => {
        const options = makeOptions("POST", false, {mealPlanName: mealPlanName});
        return fetch(URL + "/api/mealplan/create/" + username, options)
            .then(handleHttpErrors)
    }

    function updateMealPlan(mealPlanName, mealPlanId, username){
        const options = makeOptions("PUT", false, {mealPlanName: mealPlanName});
        return fetchURL(URL+"/api/mealplan/update/" + mealPlanId + "/" + username, options)
    }

    function deleteMealPlan(mealPlanId){
        const options = makeOptions("DELETE", false);
        return fetchURL(URL+"/api/mealplan/delete/"+mealPlanId, options)
    }

    function getAllMeals(mealPlanName){
        return fetchURL(URL+"/api/meal/getall/"+mealPlanName)
    }

    const createMeal = (recipeId, day, type, mealPlanId) => {
        const options = makeOptions("POST", false, {recipeId: recipeId, day: day, type: type});
        return fetch(URL + "/api/meal/create/" + mealPlanId, options)
            .then(handleHttpErrors)    
        }

    function updateMeal(recipeId, day, type, mealId, mealPlanId){
        const options = makeOptions("PUT", false, {recipeId: recipeId, day: day, type: type});
        return fetchURL(URL+"/api/meal/update/" + mealId + "/" + mealPlanId, options)
    }

    function deleteMeal(mealId){
        const options = makeOptions("DELETE", false);
        return fetchURL(URL+"/api/meal/delete/"+mealId, options)
    }

    return {
        getHouseByRental,
        getRentalByTenant,
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        getFacts,
        getCatFacts,
        getDogFacts,
        getMeals,
        getRecipeByName,
        getRecipeById,
        getAllMealPlans,
        createMealPlan,
        updateMealPlan,
        deleteMealPlan,
        getAllMeals,
        createMeal,
        updateMeal,
        deleteMeal
    }
}

const facade = apiFacade();
export default facade;