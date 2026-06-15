import "./css/style.css";
import { searchRecipes } from "./js/api.js";
import { createRecipeCard } from "./js/utils.js";
import { initializeDarkMode } from "./js/darkmode.js";

initializeDarkMode();

const form = document.querySelector(".search-form");
const container = document.querySelector("#recipeContainer");

// Load default recipes on page load
async function loadDefaultRecipes() {
  const meals = await searchRecipes("chicken");

  renderMeals(meals);
}

function renderMeals(meals) {
  if (!meals) {
    container.innerHTML = "<p>Loading recipes...</p>";
    return;
  }

  container.innerHTML = meals
    .map((meal) => createRecipeCard(meal))
    .join("");
}

// Search handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = document.querySelector("#searchInput").value;

  const meals = await searchRecipes(query);

  renderMeals(meals);
});

// initial load
loadDefaultRecipes();