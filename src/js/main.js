import appState from "./state/appState.js";

import * as nutrition from "./Api/nutrition.js";


import {
    renderCategories,
    renderAreas,
    renderRecipes,
    renderMealDetails,
    renderNutrition,
    renderProducts,
    renderProductCategories,
    setupNavigation,
    setupSidebar,
    setupAreaClicks,
    setupCategoryClicks,
    setupRecipeClicks,
    setupBackToMeals,
    setupViewToggle,
    setupLogMeal
} from "./ui/components.js";


import {
    loadFoodLog,
    addMealToFoodLog,
    renderFoodLogDate,
    renderTodayNutrition,
    renderLoggedItems,
    clearTodayFoodLog,
    renderWeeklyOverview
} from "./foodlog.js";
import * as mealdb from "./Api/mealdb.js";

import * as productsApi from "./Api/productApi.js";

setupNavigation();
setupSidebar();
loadFoodLog();

renderFoodLogDate();
renderTodayNutrition();
renderLoggedItems();
renderWeeklyOverview();
const clearFoodLogButton =
    document.getElementById("clear-foodlog");

clearFoodLogButton.addEventListener("click", () => {

    clearTodayFoodLog();

    renderTodayNutrition();
    renderLoggedItems();
    renderWeeklyOverview();

});

async function loadCategories() {

    const categories = await mealdb.getCategories();

    appState.categories = categories;

    renderCategories(appState.categories);
}

async function loadAreas() {

    const areas = await mealdb.getAreas();

    console.log("Areas from API:", areas);

    appState.areas = areas;

    renderAreas(appState.areas);
}

async function loadRecipes() {

    const meals = await mealdb.searchMeals("");

    appState.meals = meals;

    renderRecipes(appState.meals, {
        favorites: appState.favorites
    });
}

setupAreaClicks(async (area) => {

    if (area === "all") {
        appState.selectedArea = null;
        loadRecipes();
        return;
    }

    appState.selectedArea = area;

    const meals = await mealdb.getMealsByArea(area);

    appState.meals = meals;

    renderRecipes(appState.meals, {
        defaultArea: area,
        favorites: appState.favorites
    });
});

setupCategoryClicks(async (category) => {

    appState.selectedCategory = category;
    appState.selectedArea = null;

    const meals = await mealdb.getMealsByCategory(category);

    appState.meals = meals;

    renderRecipes(appState.meals, {
        defaultCategory: category,
        favorites: appState.favorites
    });
});


const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keydown", async (event) => {

    if (event.key !== "Enter") {
        return;
    }

    const query = searchInput.value.trim();

    appState.searchQuery = query;

    const meals = await mealdb.searchMeals(query);

    appState.meals = meals;

    renderRecipes(appState.meals, {
        favorites: appState.favorites
    });
});

setupViewToggle((view) => {

    appState.viewMode = view;

    renderRecipes(appState.meals, {
        favorites: appState.favorites,
        viewMode: appState.viewMode,
        defaultCategory: appState.selectedCategory,
        defaultArea: appState.selectedArea
    });

});

const mealDetails = document.getElementById("meal-details");

mealDetails.classList.add("hidden");
setupRecipeClicks(async (mealId) => {

    const meal = await mealdb.getMealById(mealId);

    appState.selectedMeal = meal;

    const ingredients = createIngredientList(meal);

    const nutrition = await analyzeNutrition(
        meal.strMeal,
        ingredients
    );

    appState.selectedNutrition = nutrition;

    renderMealDetails(meal);

    renderNutrition(nutrition);

    document
        .getElementById("all-recipes-section")
        .classList.add("hidden");

    document
        .getElementById("meal-details")
        .classList.remove("hidden");
});

setupLogMeal(
    () => ({
        meal: appState.selectedMeal,
        nutrition: appState.selectedNutrition
    }),

    (servings) => {

        if (!appState.selectedMeal) {
            console.error("No meal selected.");
            return;
        }

        if (!appState.selectedNutrition) {
            console.error("Nutrition data is not available.");
            return;
        }

        const loggedMeal = addMealToFoodLog(
            appState.selectedMeal,
            appState.selectedNutrition,
            servings
        );
        renderTodayNutrition();
        renderLoggedItems();
        renderWeeklyOverview();

        console.log("Meal logged successfully:", loggedMeal);
    }
);

setupBackToMeals(() => {

    document
        .getElementById("meal-details")
        .classList.add("hidden");

    document
        .getElementById("all-recipes-section")
        .classList.remove("hidden");

});

const productSearchInput =
    document.getElementById("product-search-input");

const searchProductButton =
    document.getElementById("search-product-btn");


async function searchProducts() {

    const query =
        productSearchInput.value.trim();
    if (!query) {
        return;
    }
    const data =
        await productsApi.searchProducts(query);

    appState.products = data.results;

    renderProducts(appState.products);

}
searchProductButton.addEventListener("click", searchProducts);
productSearchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchProducts();
    }

});

const barcodeInput =
    document.getElementById("barcode-input");

const lookupBarcodeButton =
    document.getElementById("lookup-barcode-btn");


async function lookupProductByBarcode() {

    const barcode =
        barcodeInput.value.trim();


    if (!barcode) {
        return;
    }


    const product =
        await productsApi.getProductByBarcode(barcode);


    appState.products = [product];

    renderProducts(appState.products);

}


lookupBarcodeButton.addEventListener( "click", lookupProductByBarcode);


barcodeInput.addEventListener("keydown",(event) => {

        if (event.key === "Enter") {
            lookupProductByBarcode();
        }

    }
);

const gradeButtons =
    document.querySelectorAll("[data-grade]");


gradeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const grade =
            button.dataset.grade;

        appState.selectedNutriScore = grade;


        const filteredProducts =
            appState.products.filter(product => {

                return (
                    product.nutritionGrade?.toLowerCase() === grade
                );

            });


        renderProducts(filteredProducts);

    });

});
async function loadProductCategories() {

    const data = await productsApi.getProductCategories();

    appState.productCategories = data.results;

    renderProductCategories(
        appState.productCategories
    );
}
async function testProductCategories() {

    const data = await productsApi.getProductCategories();

    console.log("Product categories:", data);

}

const productCategoriesContainer =
    document.getElementById("product-categories");


productCategoriesContainer.addEventListener(
    "click",
    async (event) => {

        const button =
            event.target.closest("[data-category]");

        if (!button) {
            return;
        }


        const category =
            button.dataset.category;


        const data =
            await productsApi.getProductsByCategory(category);


        appState.products = data.results;

        appState.selectedProductCategory = category;

        renderProducts(appState.products);

    }
);

testProductCategories();
loadProductCategories();
searchProducts();
loadCategories();
loadAreas();
loadRecipes();
