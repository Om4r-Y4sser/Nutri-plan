// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/


export function setupSidebar() {

    const sidebar = document.getElementById("sidebar");
    const menuButton = document.getElementById("header-menu-btn");
    const closeButton = document.getElementById("sidebar-close-btn");
    const overlay = document.getElementById("sidebar-overlay");


    

    menuButton.addEventListener("click", () => {

        sidebar.classList.add("open");
        overlay.classList.add("active");

    });

    closeButton.addEventListener("click", () => {

        sidebar.classList.remove("open");
        overlay.classList.remove("active");

    });

    overlay.addEventListener("click", () => {

        sidebar.classList.remove("open");
        overlay.classList.remove("active");

    });

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            sidebar.classList.remove("open");
            overlay.classList.remove("active");

        });

    });

}
export function setupNavigation() {

    const navLinks = document.querySelectorAll(".nav-link");

    const mealsPage =
        document.getElementById("search-filters-section");

    const categoriesPage =
        document.getElementById("meal-categories-section");

    const recipesPage =
        document.getElementById("all-recipes-section");

    const mealDetailsPage =
        document.getElementById("meal-details");

    const productsPage =
        document.getElementById("products-section");

    const foodLogPage =
        document.getElementById("foodlog-section");


    productsPage.style.display = "none";
    foodLogPage.style.display = "none";

    mealDetailsPage.classList.add("hidden");


    navLinks.forEach((link, index) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            mealsPage.style.display = "none";
            categoriesPage.style.display = "none";
            recipesPage.style.display = "none";
            productsPage.style.display = "none";
            foodLogPage.style.display = "none";

            mealDetailsPage.classList.add("hidden");

            if (index === 0) {

                mealsPage.style.display = "";
                categoriesPage.style.display = "";
                recipesPage.style.display = "";

            }

            else if (index === 1) {

                productsPage.style.display = "";

            }

            else if (index === 2) {

                foodLogPage.style.display = "";

            }

            navLinks.forEach(navLink => {

                navLink.classList.remove(
                    "bg-emerald-50",
                    "text-emerald-700"
                );

                navLink.classList.add(
                    "text-gray-600"
                );

            });


            link.classList.remove("text-gray-600");

            link.classList.add(
                "bg-emerald-50",
                "text-emerald-700"
            );

        });

    });

}

const categoryColors = [
    {
        bg: "#fff1f2",
        border: "#fecdd3",
        icon: "#ff3b4e"
    },
    {
        bg: "#fff7ed",
        border: "#fed7aa",
        icon: "#ff8500"
    },
    {
        bg: "#fdf2f8",
        border: "#f9a8d4",
        icon: "#ec4899"
    },
    {
        bg: "#fff7ed",
        border: "#fed7aa",
        icon: "#ff8500"
    },
    {
        bg: "#f8fafc",
        border: "#cbd5e1",
        icon: "#94a3b8"
    },
    {
        bg: "#fefce8",
        border: "#fde68a",
        icon: "#ffb700"
    },
    {
        bg: "#fff1f2",
        border: "#fecdd3",
        icon: "#ff3b4e"
    },
    {
        bg: "#eff6ff",
        border: "#7dd3fc",
        icon: "#149cff"
    },
    {
        bg: "#f0fdf4",
        border: "#bbf7d0",
        icon: "#00c77b"
    },
    {
        bg: "#ecfeff",
        border: "#a5f3fc",
        icon: "#06b6d4"
    },
    {
        bg: "#f0fdf4",
        border: "#bbf7d0",
        icon: "#00c77b"
    },
    {
        bg: "#f7fee7",
        border: "#bef264",
        icon: "#58d600"
    }
];

const categoryIcons = [
    "fa-drumstick-bite",
    "fa-drumstick-bite",
    "fa-cake-candles",
    "fa-drumstick-bite",
    "fa-bowl-food",
    "fa-bowl-food",
    "fa-bacon",
    "fa-fish",
    "fa-bowl-food",
    "fa-utensils",
    "fa-leaf",
    "fa-leaf"
];

export function renderCategories(categories) {

    const categoriesGrid = document.getElementById("categories-grid");

    let html = "";

    categories.forEach((category, index) => {

        const color = categoryColors[index % categoryColors.length];
        const icon = categoryIcons[index % categoryIcons.length];

        html += `
            <div
                class="category-card rounded-xl p-3 border hover:shadow-md cursor-pointer transition-all group"
                style="
                    background-color: ${color.bg};
                    border-color: ${color.border};
                "
                data-category="${category.strCategory}"
            >

                <div class="flex items-center gap-2.5">

                    <div
                        class="text-white w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                        style="background-color: ${color.icon};"
                    >
                        <i class="fa-solid ${icon}"></i>
                    </div>

                    <div>
                        <h3 class="text-sm font-bold text-gray-900">
                            ${category.strCategory}
                        </h3>
                    </div>

                </div>

            </div>
        `;
    });

    categoriesGrid.innerHTML = html;
}

export function setupCategoryClicks(callback) {

    const categoriesGrid = document.getElementById("categories-grid");

    categoriesGrid.addEventListener("click", (event) => {

        const card = event.target.closest(".category-card");

        if (!card) {
            return;
        }

        callback(card.dataset.category);
    });
}


export function renderAreas(areas) {

    const areasGrid = document.getElementById("areas-grid");

    let html = `
        <button
            class="area-filter-btn px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
            data-area="all"
        >
            All Recipes
        </button>
    `;

    areas.forEach(area => {

        html += `
            <button
                class="area-filter-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
                data-area="${area.strArea}"
            >
                ${area.strArea}
            </button>
        `;

    });

    areasGrid.innerHTML = html;
}

export function setupAreaClicks(callback) {

    const areasGrid = document.getElementById("areas-grid");

    areasGrid.addEventListener("click", (event) => {

        const button = event.target.closest(".area-filter-btn");

        if (!button) {
            return;
        }

        const allButtons = areasGrid.querySelectorAll(".area-filter-btn");

        allButtons.forEach(btn => {
            btn.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
            btn.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
        });

        button.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
        button.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");

        callback(button.dataset.area);
    });
}



export function setupViewToggle(callback) {

    const gridButton = document.getElementById("grid-view-btn");
    const listButton = document.getElementById("list-view-btn");

    gridButton.addEventListener("click", () => {
        callback("grid");
    });

    listButton.addEventListener("click", () => {
        callback("list");
    });
}   

export function renderRecipes(meals, options) {

    options = options || {};

    const recipesGrid = document.getElementById("recipes-grid");
    const recipesCount = document.getElementById("recipes-count");

    const favorites = options.favorites || [];
    const viewMode = options.viewMode || "grid";

    recipesCount.textContent = `Showing ${meals.length} recipes`;


    if (viewMode === "grid") {

        recipesGrid.className = "grid grid-cols-4 gap-5";

    } else {

        recipesGrid.className = "grid grid-cols-2 gap-4";
    }


    let html = "";


    meals.forEach(meal => {

        const category = meal.strCategory || options.defaultCategory;
        const area = meal.strArea || options.defaultArea;

        const isFavorited = favorites.indexOf(meal.idMeal) !== -1;

        const heartClass = isFavorited
            ? "fa-solid"
            : "fa-regular";

        const heartColor = isFavorited
            ? "text-red-500"
            : "text-gray-600";

        const cardClass = viewMode === "grid"
            ? "recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            : "recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex";


        const imageContainerClass = viewMode === "grid"
            ? "relative h-48 overflow-hidden"
            : "relative w-48 h-40 flex-shrink-0 overflow-hidden";


        const contentClass = viewMode === "grid"
            ? "p-4"
            : "p-4 flex-1";


        html += `

            <div
                class="${cardClass}"
                data-id="${meal.idMeal}"
            >

                <!-- Recipe Image -->

                <div class="${imageContainerClass}">

                    <img
                        src="${meal.strMealThumb}"
                        alt="${meal.strMeal}"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    >


                    <!-- Category + Area badges -->

                    <div class="absolute bottom-3 left-3 flex gap-2">

                        ${category ? `
                            <span
                                class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                            >
                                ${category}
                            </span>
                        ` : ""}


                        ${area ? `
                            <span
                                class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                            >
                                ${area}
                            </span>
                        ` : ""}

                    </div>


                    <!-- Favorite button -->

                    <button
                        class="favorite-btn absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white"
                        data-id="${meal.idMeal}"
                    >

                        <i class="${heartClass} fa-heart ${heartColor}"></i>

                    </button>

                </div>


                <!-- Recipe information -->

                <div class="${contentClass}">

                    <h3
                        class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                    >
                        ${meal.strMeal}
                    </h3>


                    <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                    ${meal.strInstructions || "No description available."}
                    </p>


                    <div class="flex items-center justify-between text-xs">

                        ${category ? `
                            <span class="font-semibold text-gray-900">

                                <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>

                                ${category}

                            </span>
                        ` : "<span></span>"}


                        ${area ? `
                            <span class="font-semibold text-gray-500">

                                <i class="fa-solid fa-globe text-blue-500 mr-1"></i>

                                ${area}

                            </span>
                        ` : ""}

                    </div>

                </div>

            </div>

        `;

    });


    recipesGrid.innerHTML = html;
}

export function setupFavoriteClicks(callback) {

    const recipesGrid = document.getElementById("recipes-grid");

    recipesGrid.addEventListener("click", (event) => {

        const button = event.target.closest(".favorite-btn");

        if (!button) {
            return;
        }

        event.stopPropagation();

        const icon = button.querySelector("i");
        const isNowFavorited = icon.classList.contains("fa-regular");

        if (isNowFavorited) {
            icon.classList.remove("fa-regular", "text-gray-600");
            icon.classList.add("fa-solid", "text-red-500");
        } else {
            icon.classList.remove("fa-solid", "text-red-500");
            icon.classList.add("fa-regular", "text-gray-600");
        }

        callback(button.dataset.id, isNowFavorited);
    });
}

export function setupRecipeClicks(callback) {

    const recipesGrid = document.getElementById("recipes-grid");

    recipesGrid.addEventListener("click", (event) => {

        const card = event.target.closest(".recipe-card");

        if (!card) {
            return;
        }

        callback(card.dataset.id);
    });
}


export function renderMealDetails(meal) {

    const heroImage = document.getElementById("meal-hero-image");
    const mealTitle = document.getElementById("meal-title");
    const mealBadges = document.getElementById("meal-badges");

    const ingredientsList =
        document.getElementById("ingredients-list");

    const ingredientsCount =
        document.getElementById("ingredients-count");

    const instructionsList =
        document.getElementById("instructions-list");

    const mealVideo =
        document.getElementById("meal-video");


    heroImage.src = meal.strMealThumb;
    heroImage.alt = meal.strMeal;

    mealTitle.textContent = meal.strMeal;

    mealBadges.innerHTML = "";

    if (meal.strCategory) {

        mealBadges.innerHTML += `
            <span
                class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
            >
                ${meal.strCategory}
            </span>
        `;
    }


    if (meal.strArea) {

        mealBadges.innerHTML += `
            <span
                class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
            >
                ${meal.strArea}
            </span>
        `;
    }


    if (meal.strTags) {

        const tag = meal.strTags.split(",")[0].trim();

        if (tag) {

            mealBadges.innerHTML += `
                <span
                    class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
                >
                    ${tag}
                </span>
            `;
        }
    }


    let ingredientsHTML = "";
    let ingredientCount = 0;


    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];


        if (ingredient && ingredient.trim() !== "") {

            ingredientCount++;


            ingredientsHTML += `
                <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                >

                    <input
                        type="checkbox"
                        class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />

                    <span class="text-gray-700">

                        <span class="font-medium text-gray-900">
                            ${measure || ""}
                        </span>

                        ${ingredient}

                    </span>

                </div>
            `;
        }
    }


    ingredientsList.innerHTML = ingredientsHTML;

    ingredientsCount.textContent =
        `${ingredientCount} items`;


    const instructions = meal.strInstructions || "";

    const steps = instructions
        .split(/\r?\n/)
        .map(step => step.trim())
        .filter(step => step !== "");


    let instructionsHTML = "";


    steps.forEach((step, index) => {

        instructionsHTML += `
            <div
                class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >

                <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                >
                    ${index + 1}
                </div>

                <p class="text-gray-700 leading-relaxed pt-2">
                    ${step}
                </p>

            </div>
        `;
    });


    instructionsList.innerHTML = instructionsHTML;

    if (meal.strYoutube) {

        let videoId = "";

        if (meal.strYoutube.includes("watch?v=")) {

            videoId =
                meal.strYoutube.split("watch?v=")[1].split("&")[0];

        } else if (meal.strYoutube.includes("youtu.be/")) {

            videoId =
                meal.strYoutube.split("youtu.be/")[1].split("?")[0];
        }


        if (videoId) {

            mealVideo.src =
                `https://www.youtube.com/embed/${videoId}`;

        }
    }
}

export function setupBackToMeals(callback) {

    const backButton = document.getElementById("back-to-meals-btn");

    backButton.addEventListener("click", () => {
        callback();
    });
}

export function setupLogMeal(getMealData, callback) {

    const logMealButton =
        document.getElementById("log-meal-btn");

    let servings = 1.0;

    const modal = document.createElement("div");

    modal.id = "log-meal-modal";

    modal.className =
        "fixed inset-0 z-[100] hidden items-center justify-center bg-black/50 p-4";

    modal.innerHTML = `
        <div
            class="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6"
        >

            <!-- Header -->
            <div class="flex items-center gap-4 mb-6">

                <img
                    id="log-meal-image"
                    src=""
                    alt=""
                    class="w-16 h-16 rounded-xl object-cover"
                >

                <div>
                    <h2 class="text-xl font-bold text-gray-900">
                        Log This Meal
                    </h2>

                    <p
                        id="log-meal-name"
                        class="text-sm text-gray-500"
                    ></p>
                </div>

            </div>


            <!-- Servings -->
            <div class="mb-6">

                <p class="text-sm font-semibold text-gray-700 mb-3">
                    Number of Servings
                </p>

                <div class="flex items-center gap-3">

                    <button
                        id="servings-minus"
                        type="button"
                        class="w-10 h-10 bg-gray-100 rounded-lg text-xl font-semibold hover:bg-gray-200"
                    >
                        −
                    </button>

                    <div
                        id="servings-value"
                        class="w-20 h-11 border-2 border-gray-200 rounded-lg flex items-center justify-center text-lg font-bold"
                    >
                        1.0
                    </div>

                    <button
                        id="servings-plus"
                        type="button"
                        class="w-10 h-10 bg-gray-100 rounded-lg text-xl font-semibold hover:bg-gray-200"
                    >
                        +
                    </button>

                </div>

            </div>


            <!-- Nutrition Preview -->
            <div class="bg-emerald-50 rounded-xl p-4 mb-6">

                <p class="text-sm text-gray-600 mb-4">
                    Estimated nutrition:
                </p>

                <div class="grid grid-cols-4 gap-3 text-center">

                    <div>
                        <p
                            id="modal-calories"
                            class="text-lg font-bold text-emerald-600"
                        >
                            0
                        </p>

                        <p class="text-xs text-gray-500">
                            Calories
                        </p>
                    </div>


                    <div>
                        <p
                            id="modal-protein"
                            class="text-lg font-bold text-blue-600"
                        >
                            0g
                        </p>

                        <p class="text-xs text-gray-500">
                            Protein
                        </p>
                    </div>


                    <div>
                        <p
                            id="modal-carbs"
                            class="text-lg font-bold text-orange-500"
                        >
                            0g
                        </p>

                        <p class="text-xs text-gray-500">
                            Carbs
                        </p>
                    </div>


                    <div>
                        <p
                            id="modal-fat"
                            class="text-lg font-bold text-purple-600"
                        >
                            0g
                        </p>

                        <p class="text-xs text-gray-500">
                            Fat
                        </p>
                    </div>

                </div>

            </div>


            <!-- Buttons -->
            <div class="flex gap-3">

                <button
                    id="cancel-log-meal"
                    type="button"
                    class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                >
                    Cancel
                </button>

                <button
                    id="confirm-log-meal"
                    type="button"
                    class="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                >
                    <i class="fa-solid fa-clipboard-list mr-2"></i>
                    Log Meal
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    const mealImage =
        document.getElementById("log-meal-image");

    const mealName =
        document.getElementById("log-meal-name");

    const servingsValue =
        document.getElementById("servings-value");

    const minusButton =
        document.getElementById("servings-minus");

    const plusButton =
        document.getElementById("servings-plus");

    const caloriesValue =
        document.getElementById("modal-calories");

    const proteinValue =
        document.getElementById("modal-protein");

    const carbsValue =
        document.getElementById("modal-carbs");

    const fatValue =
        document.getElementById("modal-fat");

    const cancelButton =
        document.getElementById("cancel-log-meal");

    const confirmButton =
        document.getElementById("confirm-log-meal");


    function updateNutritionPreview(nutrition) {

    if (!nutrition?.data?.perServing) {
        return;
    }

    const perServing =
        nutrition.data.perServing;

    caloriesValue.textContent =
        Math.round(
            Number(perServing.calories || 0) * servings
        );

    proteinValue.textContent =
        `${(
            Number(perServing.protein || 0) * servings
        ).toFixed(1)}g`;

    carbsValue.textContent =
        `${(
            Number(perServing.carbs || 0) * servings
        ).toFixed(1)}g`;

    fatValue.textContent =
        `${(
            Number(perServing.fat || 0) * servings
        ).toFixed(1)}g`;
}

    logMealButton.addEventListener("click", () => {

    const {
        meal,
        nutrition
    } = getMealData();

    if (!meal || !nutrition) {
        console.error(
            "Meal or nutrition data is not available."
        );

        return;
    }

    servings = 1.0;

    mealImage.src =
        meal.strMealThumb;

    mealImage.alt =
        meal.strMeal;

    mealName.textContent =
        meal.strMeal;

    servingsValue.textContent =
        servings.toFixed(1);

    updateNutritionPreview(nutrition);

    modal.classList.remove("hidden");
    modal.classList.add("flex");
});

    minusButton.addEventListener("click", () => {

    if (servings <= 1.0) {
        return;
    }

    servings -= 0.5;

    servingsValue.textContent =
        servings.toFixed(1);

    updateNutritionPreview(
        getMealData().nutrition
    );
});

    plusButton.addEventListener("click", () => {

    servings += 0.5;

    servingsValue.textContent =
        servings.toFixed(1);

    updateNutritionPreview(
        getMealData().nutrition
    );
});k
    cancelButton.addEventListener("click", () => {

        modal.classList.add("hidden");
        modal.classList.remove("flex");

    });

    confirmButton.addEventListener("click", () => {

        callback(servings);

        modal.classList.add("hidden");
        modal.classList.remove("flex");

    });

}

export function renderNutrition(nutrition) {

    const container =
        document.getElementById("nutrition-facts-container");

    const data = nutrition.data;

    const totals = data.totals;
    const perServing = data.perServing;


    container.innerHTML = `

        <p class="text-sm text-gray-500 mb-4">
            Per serving
        </p>


        <div
            class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
        >

            <p class="text-sm text-gray-600">
                Calories per serving
            </p>

            <p class="text-4xl font-bold text-emerald-600">
                ${perServing.calories}
            </p>

            <p class="text-xs text-gray-500 mt-1">
                Total: ${totals.calories} cal
            </p>

        </div>


        <div class="space-y-4">

            <div>
                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-2">

                        <div
                            class="w-3 h-3 rounded-full bg-emerald-500"
                        ></div>

                        <span class="text-gray-700">
                            Protein
                        </span>

                    </div>

                    <span class="font-bold text-gray-900">
                        ${perServing.protein}g
                    </span>

                </div>

                <div class="w-full bg-gray-100 rounded-full h-2 mt-2">

                    <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: ${Math.min(perServing.protein, 100)}%"
                    ></div>

                </div>

            </div>


            <div>
                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-2">

                        <div
                            class="w-3 h-3 rounded-full bg-blue-500"
                        ></div>

                        <span class="text-gray-700">
                            Carbs
                        </span>

                    </div>

                    <span class="font-bold text-gray-900">
                        ${perServing.carbs}g
                    </span>

                </div>

                <div class="w-full bg-gray-100 rounded-full h-2 mt-2">

                    <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: ${Math.min(perServing.carbs, 100)}%"
                    ></div>

                </div>

            </div>


            <div>
                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-2">

                        <div
                            class="w-3 h-3 rounded-full bg-purple-500"
                        ></div>

                        <span class="text-gray-700">
                            Fat
                        </span>

                    </div>

                    <span class="font-bold text-gray-900">
                        ${perServing.fat}g
                    </span>

                </div>

                <div class="w-full bg-gray-100 rounded-full h-2 mt-2">

                    <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: ${Math.min(perServing.fat * 2, 100)}%"
                    ></div>

                </div>

            </div>


            <div>
                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-2">

                        <div
                            class="w-3 h-3 rounded-full bg-orange-500"
                        ></div>

                        <span class="text-gray-700">
                            Fiber
                        </span>

                    </div>

                    <span class="font-bold text-gray-900">
                        ${perServing.fiber}g
                    </span>

                </div>

                <div class="w-full bg-gray-100 rounded-full h-2 mt-2">

                    <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: ${Math.min(perServing.fiber * 5, 100)}%"
                    ></div>

                </div>

            </div>


            <div>
                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-2">

                        <div
                            class="w-3 h-3 rounded-full bg-pink-500"
                        ></div>

                        <span class="text-gray-700">
                            Sugar
                        </span>

                    </div>

                    <span class="font-bold text-gray-900">
                        ${perServing.sugar}g
                    </span>

                </div>

                <div class="w-full bg-gray-100 rounded-full h-2 mt-2">

                    <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: ${Math.min(perServing.sugar * 2, 100)}%"
                    ></div>

                </div>

            </div>

        </div>


        <div class="mt-6 pt-6 border-t border-gray-100">

            <h3 class="text-sm font-semibold text-gray-900 mb-3">
                Other Nutrition
            </h3>

            <div class="grid grid-cols-2 gap-3 text-sm">

                <div class="flex justify-between">
                    <span class="text-gray-600">
                        Saturated Fat
                    </span>

                    <span class="font-medium">
                        ${perServing.saturatedFat}g
                    </span>
                </div>


                <div class="flex justify-between">
                    <span class="text-gray-600">
                        Cholesterol
                    </span>

                    <span class="font-medium">
                        ${perServing.cholesterol}mg
                    </span>
                </div>


                <div class="flex justify-between">
                    <span class="text-gray-600">
                        Sodium
                    </span>

                    <span class="font-medium">
                        ${perServing.sodium}mg
                    </span>
                </div>

            </div>

        </div>
    `;
}


export function renderProducts(products) {

    const productsGrid =
        document.getElementById("products-grid");

    const productsCount =
        document.getElementById("products-count");


    productsGrid.innerHTML = "";


    if (!products || products.length === 0) {

        productsGrid.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-12 text-center">

                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-box-open text-gray-400 text-2xl"></i>
                </div>

                <p class="text-gray-500 text-lg">
                    No products found
                </p>

                <p class="text-gray-400 text-sm mt-2">
                    Try searching for something else
                </p>

            </div>
        `;

        productsCount.textContent = "0 products";

        return;
    }


    productsCount.textContent =
        `${products.length} products`;


    products.forEach(product => {

        const nutrients = product.nutrients || {};


        const calories =
            nutrients.calories ?? 0;

        const protein =
            nutrients.protein ?? 0;

        const carbs =
            nutrients.carbs ?? 0;

        const fat =
            nutrients.fat ?? 0;

        const sugar =
            nutrients.sugar ?? 0;


        const grade =
            product.nutritionGrade || "unknown";


        const gradeColors = {

            a: "bg-green-500",
            b: "bg-lime-500",
            c: "bg-yellow-500",
            d: "bg-orange-500",
            e: "bg-red-500",
            unknown: "bg-gray-400"

        };


        const gradeColor =
            gradeColors[grade] || gradeColors.unknown;


        const gradeText =
            grade === "unknown"
                ? "Unknown"
                : `Nutri-Score ${grade.toUpperCase()}`;


        const nova =
            product.novaGroup ?? "—";


        const card = document.createElement("div");


        card.className =
            "product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group";


        card.dataset.barcode =
            product.barcode || "";


        card.innerHTML = `

            <div
                class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
            >

                <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${product.image || ""}"
                    alt="${product.name || "Product"}"
                    loading="lazy"
                />


                <div
                    class="absolute top-2 left-2 ${gradeColor} text-white text-xs font-bold px-2 py-1 rounded uppercase"
                >
                    ${gradeText}
                </div>


                <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA ${nova}"
                >
                    ${nova}
                </div>

            </div>


            <div class="p-4">

                <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                >
                    ${product.brand || "Unknown brand"}
                </p>


                <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                >
                    ${product.name || "Unnamed product"}
                </h3>


                <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                >

                    <span>
                        <i class="fa-solid fa-barcode mr-1"></i>
                        ${product.barcode || "N/A"}
                    </span>

                    <span>
                        <i class="fa-solid fa-fire mr-1"></i>
                        ${Number(calories).toFixed(0)} kcal/100g
                    </span>

                </div>


                <div class="grid grid-cols-4 gap-1 text-center">

                    <div class="bg-emerald-50 rounded p-1.5">

                        <p class="text-xs font-bold text-emerald-700">
                            ${Number(protein).toFixed(1)}g
                        </p>

                        <p class="text-[10px] text-gray-500">
                            Protein
                        </p>

                    </div>


                    <div class="bg-blue-50 rounded p-1.5">

                        <p class="text-xs font-bold text-blue-700">
                            ${Number(carbs).toFixed(1)}g
                        </p>

                        <p class="text-[10px] text-gray-500">
                            Carbs
                        </p>

                    </div>


                    <div class="bg-purple-50 rounded p-1.5">

                        <p class="text-xs font-bold text-purple-700">
                            ${Number(fat).toFixed(1)}g
                        </p>

                        <p class="text-[10px] text-gray-500">
                            Fat
                        </p>

                    </div>


                    <div class="bg-orange-50 rounded p-1.5">

                        <p class="text-xs font-bold text-orange-700">
                            ${Number(sugar).toFixed(1)}g
                        </p>

                        <p class="text-[10px] text-gray-500">
                            Sugar
                        </p>

                    </div>

                </div>

            </div>
        `;


        productsGrid.appendChild(card);

    });
}

export function renderProductCategories(categories) {

    const container =
        document.getElementById("product-categories");

    container.innerHTML = "";

    categories.forEach(category => {

        const button = document.createElement("button");

        button.className =
            "px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-all whitespace-nowrap";

        button.textContent = category.name;

        button.dataset.category = category.id;

        container.appendChild(button);

    });
}