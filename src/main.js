import "./css/style.css";

import { searchRecipes, getFoodImage } from "./js/api.js";
import { createRecipeCard } from "./js/utils.js";
import { initializeDarkMode } from "./js/darkmode.js";

const form = document.querySelector(".search-form");
const container = document.querySelector("#recipeContainer");

// Load recipes when page opens
async function loadDefaultRecipes() {
  const meals = await searchRecipes("chicken");
  renderMeals(meals);
}

function renderMeals(meals) {
  if (!meals) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  container.innerHTML = meals
    .map((meal) => createRecipeCard(meal))
    .join("");
}

// Search recipes
form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query =
    document.querySelector("#searchInput").value.trim();

  if (!query) return;

  const meals = await searchRecipes(query);

  renderMeals(meals);
});

// Hero image
async function loadHeroImage() {
  const image = await getFoodImage();

  const hero =
    document.querySelector("#heroImage");

  if (hero && image) {
    hero.innerHTML = `
      <img
        src="${image}"
        alt="Food Inspiration"
      />
    `;
  }
}

// Initialize
initializeDarkMode();
loadDefaultRecipes();
loadHeroImage();