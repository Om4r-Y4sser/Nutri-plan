const apiKey = "yfq9W1ZBS8tk5eD0jcazE8RHcd0SYFnx0GkkFAlV"
const BASE_URL = "https://nutriplan-api.vercel.app/api";

export async function analyzeNutrition(recipeName, ingredients) {

    const response = await fetch(
        `${BASE_URL}/nutrition/analyze`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey
            },

            body: JSON.stringify({
                recipeName: recipeName,
                ingredients: ingredients
            })
        }
    );


    if (!response.ok) {
        throw new Error("Failed to analyze nutrition");
    }


    const data = await response.json();

    return data;
}

export function createIngredientList(meal) {

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {

            const item = `${measure || ""} ${ingredient}`.trim();

            ingredients.push(item);
        }
    }

    return ingredients;
}