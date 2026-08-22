import appState from "./state/appState.js";

const STORAGE_KEY = "nutriplan_food_log";

export function loadFoodLog() {
    const savedLog = localStorage.getItem(STORAGE_KEY);

    if (!savedLog) {
        appState.foodLog = {};
        return;
    }

    try {
        appState.foodLog = JSON.parse(savedLog);
    } catch (error) {
        console.error("Failed to load food log:", error);
        appState.foodLog = {};
    }
}


export function saveFoodLog() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appState.foodLog)
    );
}


export function getTodayKey() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export function addMealToFoodLog(meal, nutrition, servings = 1) {

    if (!meal || !nutrition?.data?.perServing) {
        throw new Error("Meal or nutrition data is missing");
    }

    const today = getTodayKey();
    const perServing = nutrition.data.perServing;

    if (!appState.foodLog[today]) {
        appState.foodLog[today] = [];
    }

    const foodLogItem = {
        id: `meal-${meal.idMeal}-${Date.now()}`,

        type: "meal",

        mealId: meal.idMeal,

        name: meal.strMeal,

        image: meal.strMealThumb,

        calories: Number(perServing.calories || 0) * servings,
        protein: Number(perServing.protein || 0) * servings,
        carbs: Number(perServing.carbs || 0) * servings,
        fat: Number(perServing.fat || 0) * servings,
        fiber: Number(perServing.fiber || 0) * servings,
        sugar: Number(perServing.sugar || 0) * servings,

        servings: servings,

        loggedAt: new Date().toISOString()
    };

    appState.foodLog[today].push(foodLogItem);

    saveFoodLog();

    return foodLogItem;
}


export function getFormattedToday() {
    const today = new Date();

    return today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric"
    });
}

export function renderFoodLogDate() {
    const dateElement =
        document.getElementById("foodlog-date");

    if (!dateElement) {
        return;
    }

    dateElement.textContent =
        getFormattedToday();
}

export function calculateTodayTotals() {

    const today = getTodayKey();

    const todayItems =
        appState.foodLog[today] || [];

    const totals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    };

    todayItems.forEach(item => {

        totals.calories +=
            Number(item.calories) || 0;

        totals.protein +=
            Number(item.protein) || 0;

        totals.carbs +=
            Number(item.carbs) || 0;

        totals.fat +=
            Number(item.fat) || 0;

    });

    return totals;
}

export function renderTodayNutrition() {

    const totals =
        calculateTodayTotals();

    const goals = {
        calories: 2000,
        protein: 50,
        carbs: 250,
        fat: 65
    };


    const caloriesText =
        document.getElementById(
            "calories-progress-text"
        );

    const proteinText =
        document.getElementById(
            "protein-progress-text"
        );

    const carbsText =
        document.getElementById(
            "carbs-progress-text"
        );

    const fatText =
        document.getElementById(
            "fat-progress-text"
        );


    const caloriesBar =
        document.getElementById(
            "calories-progress-bar"
        );

    const proteinBar =
        document.getElementById(
            "protein-progress-bar"
        );

    const carbsBar =
        document.getElementById(
            "carbs-progress-bar"
        );

    const fatBar =
        document.getElementById(
            "fat-progress-bar"
        );


    caloriesText.textContent =
        `${Math.round(totals.calories)} / ${goals.calories} kcal`;

    proteinText.textContent =
        `${totals.protein.toFixed(1)} / ${goals.protein} g`;

    carbsText.textContent =
        `${totals.carbs.toFixed(1)} / ${goals.carbs} g`;

    fatText.textContent =
        `${totals.fat.toFixed(1)} / ${goals.fat} g`;


    caloriesBar.style.width =
        `${Math.min(
            (totals.calories / goals.calories) * 100,
            100
        )}%`;

    proteinBar.style.width =
        `${Math.min(
            (totals.protein / goals.protein) * 100,
            100
        )}%`;

    carbsBar.style.width =
        `${Math.min(
            (totals.carbs / goals.carbs) * 100,
            100
        )}%`;

    fatBar.style.width =
        `${Math.min(
            (totals.fat / goals.fat) * 100,
            100
        )}%`;
}

export function renderLoggedItems() {

    const today = getTodayKey();

    const todayItems =
        appState.foodLog[today] || [];

    const itemsContainer =
        document.getElementById("logged-items-list");

    const countElement =
        document.getElementById("logged-items-count");

    const clearButton =
        document.getElementById("clear-foodlog");


    if (!itemsContainer || !countElement) {
        return;
    }


    countElement.textContent =
        `Logged Items (${todayItems.length})`;

    if (todayItems.length === 0) {

        itemsContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">

                <i
                    class="fa-solid fa-utensils text-4xl mb-3 text-gray-300">
                </i>

                <p class="font-medium">
                    No meals logged today
                </p>

                <p class="text-sm">
                    Add meals from the Meals page or scan products
                </p>

            </div>
        `;

        if (clearButton) {
            clearButton.style.display = "none";
        }

        return;
    }


    if (clearButton) {
        clearButton.style.display = "block";
    }

    itemsContainer.innerHTML =
        todayItems.map(item => {

            const loggedTime =
                new Date(item.loggedAt).toLocaleTimeString(
                    "en-US",
                    {
                        hour: "numeric",
                        minute: "2-digit"
                    }
                );

            return `
                <div
                    class="flex items-center gap-4 bg-gray-50 rounded-xl p-4"
                >

                    <!-- Meal Image -->
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        class="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    >


                    <!-- Meal Information -->
                    <div class="flex-1 min-w-0">

                        <p
                            class="font-semibold text-gray-900 truncate"
                        >
                            ${item.name}
                        </p>

                        <p class="text-sm text-gray-500">
                            ${item.servings} 
                            ${item.servings === 1 ? "serving" : "servings"}
                            <span class="mx-1">•</span>
                            ${item.type === "meal" ? "Recipe" : "Product"}
                        </p>

                        <p class="text-xs text-gray-400 mt-1">
                            ${loggedTime}
                        </p>

                    </div>


                    <!-- Calories -->
                    <div class="text-right">

                        <p class="text-lg font-bold text-emerald-600">
                            ${Math.round(item.calories)}
                        </p>

                        <p class="text-xs text-gray-500">
                            kcal
                        </p>

                    </div>


                    <!-- Delete -->
                    <button
                        type="button"
                        data-remove-food="${item.id}"
                        class="text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove meal"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>
            `;
        }).join("");
}

export function clearTodayFoodLog() {

    const today = getTodayKey();

    appState.foodLog[today] = [];

    saveFoodLog();
}

export function renderWeeklyOverview() {

    const weeklyContainer =
        document.getElementById("weekly-chart");

    if (!weeklyContainer) {
        return;
    }

    const today = new Date();

    const dayOfWeek = today.getDay();

    const monday = new Date(today);

    const daysFromMonday =
        dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    monday.setDate(
        today.getDate() - daysFromMonday
    );

    const days = [];

    for (let i = 0; i < 7; i++) {

        const date = new Date(monday);

        date.setDate(
            monday.getDate() + i
        );

        days.push(date);
    }

    weeklyContainer.innerHTML =
        days.map(date => {

            const dateKey =
                getDateKey(date);

            const items =
                appState.foodLog[dateKey] || [];

            const calories =
                items.reduce(
                    (total, item) =>
                        total + (Number(item.calories) || 0),
                    0
                );

            const isToday =
                dateKey === getTodayKey();

            const dayName =
                date.toLocaleDateString("en-US", {
                    weekday: "short"
                });

            const dayNumber =
                date.getDate();

            return `
    <div class="flex flex-col items-center justify-center rounded-xl py-4 min-h-[110px] ${isToday ? "bg-indigo-100" : ""}">
        <p class="text-xs text-gray-500">
            ${dayName}
        </p>
        <p class="text-sm font-medium text-gray-900 mt-1">
            ${dayNumber}
        </p>
        <p class="text-xl font-bold text-gray-300 mt-3">
            ${Math.round(calories)}
        </p>
        <p class="text-xs text-gray-300">
            kcal
        </p>
    </div>
`;

        }).join("");
}
function getDateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;
}