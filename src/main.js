import "./css/style.css";

import { searchRecipes, getFoodImage } from "./js/api.js";
import { createRecipeCard } from "./js/utils.js";
import { initializeDarkMode } from "./js/darkmode.js";
import { getFavoriteCount } from "./js/storage.js";

const form = document.querySelector(".search-form");
const container = document.querySelector("#recipeContainer");
const count =
  document.querySelector("#favoriteCount");

if (count) {
  count.textContent =
    getFavoriteCount();
}
const topBtn =
  document.querySelector("#topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// Load recipes when page opens
async function loadDefaultRecipes() {
  const meals = await searchRecipes("chicken");
  renderMeals(meals);
}

function renderMeals(meals) {
  if (!meals || meals.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No recipes found</h3>
        <p>Try searching for another meal.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = meals
    .map((meal) => createRecipeCard(meal))
    .join("");
}

// Search recipes
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query =
    document.querySelector("#searchInput").value;

  container.innerHTML = `
    <div class="loader"></div>
  `;

  const meals =
    await searchRecipes(query);

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