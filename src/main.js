import "./css/style.css";
import { searchRecipes, getFoodImage } from "./js/api.js";
import { createRecipeCard } from "./js/utils.js";
import { initializeDarkMode } from "./js/darkmode.js";

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

async function loadHeroImage() {
  const image = await getFoodImage();

  const hero =
    document.querySelector("#heroImage");

  if (image) {
    hero.innerHTML = `
      <img
        src="${image}"
        alt="Food inspiration"
      >
    `;
  }
}

// initial load
loadDefaultRecipes();
initializeDarkMode();
loadHeroImage();