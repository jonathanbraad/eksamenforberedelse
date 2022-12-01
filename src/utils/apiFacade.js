const URL = "http://localhost:8080/Eksamensprojekt_war_exploded";

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

    function getRecipeByName(){
        return fetchURL(URL+"/api/search/recipe/name")
    }

    function getRecipeById(){
        return fetchURL(URL+"/api/search/recipe/id")
    }

    function getAllMealPlans(){
        return fetchURL(URL+"/api/mealplan/getall")
    }

    function createMealPlan(){
        return fetchURL(URL+"/api/mealplan/create")
    }

    function updateMealPlan(){
        return fetchURL(URL+"/api/mealplan/update")
    }

    function deleteMealPlan(){
        return fetchURL(URL+"/api/mealplan/delete")
    }

    function getAllMeals(){
        return fetchURL(URL+"/api/meal/getall")
    }

    function createMeal(){
        return fetchURL(URL+"/api/meal/create")
    }

    function updateMeal(){
        return fetchURL(URL+"/api/meal/update")
    }

    function deleteMeal(){
        return fetchURL(URL+"/api/meal/delete")
    }

    return {
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