const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function getCategories() {
    const response = await fetch(BASE_URL + "/categories.php");
    const data = await response.json();

    if (data.categories) {
        return data.categories;
    }

    return [];
}

export async function searchMeals(query) {
    const response = await fetch(
        BASE_URL + "/search.php?s=" + query
    );

    const data = await response.json();

    if (data.meals) {
        return data.meals;
    }

    return [];
}

export async function getMealById(id) {
    const response = await fetch(
        BASE_URL + "/lookup.php?i=" + id
    );

    const data = await response.json();

    if (data.meals) {
        return data.meals[0];
    }

    return null;
}

export async function getMealsByCategory(category) {
    const response = await fetch(
        BASE_URL + "/filter.php?c=" + category
    );

    const data = await response.json();

    if (data.meals) {
        return data.meals;
    }

    return [];
}

export async function getMealsByArea(area) {

    const response = await fetch(
        BASE_URL + "/filter.php?a=" + encodeURIComponent(area)
    );

    const data = await response.json();

    return data.meals || [];
}
export async function getAreas() {

    const response = await fetch(
        BASE_URL + "/list.php?a=list"
    );

    const data = await response.json();

    return data.meals || [];
}

export async function getRandomMeal() {
    const response = await fetch(BASE_URL + "/random.php");

    const data = await response.json();

    if (data.meals) {
        return data.meals[0];
    }

    return null;
}

