import "./css/style.css";

import { filterRecipesByCategory, getFoodImage, searchRecipes } from "./js/api.js";
import { initializeDarkMode } from "./js/darkmode.js";
import { getFavoriteCount, getRecentRecipes, getSearchHistory, saveSearch } from "./js/storage.js";
import { createRecipeCard } from "./js/utils.js";

const form = document.querySelector(".search-form");
const container = document.querySelector("#recipeContainer");
const count = document.querySelector("#favoriteCount");
const searchInput = document.querySelector("#searchInput");
const topBtn = document.querySelector("#topBtn");

if (count) {
  count.textContent = getFavoriteCount();
}

if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

async function loadDefaultRecipes() {
  container.innerHTML = '<div class="loader"></div>';
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) return;

  container.innerHTML = '<div class="loader"></div>';

  const meals = await searchRecipes(query);

  renderMeals(meals);
  saveSearch(query);
  renderSearchHistory();
});

document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    container.innerHTML = '<div class="loader"></div>';

    const meals = await filterRecipesByCategory(button.dataset.category);

    renderMeals(meals);
  });
});

async function loadHeroImage() {
  const image = await getFoodImage();
  const hero = document.querySelector("#heroImage");

  if (hero && image) {
    hero.innerHTML = `
      <img
        src="${image}"
        alt="Food inspiration"
      >
    `;
  }
}

function renderSearchHistory() {
  const history = getSearchHistory();
  const historyContainer = document.querySelector("#searchHistory");

  if (!historyContainer) return;

  historyContainer.innerHTML = history
    .map((item) => `<button type="button" class="history-btn">${item}</button>`)
    .join("");

  document.querySelectorAll(".history-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      searchInput.value = button.textContent;
      container.innerHTML = '<div class="loader"></div>';

      const meals = await searchRecipes(button.textContent);

      renderMeals(meals);
    });
  });
}

function renderRecentRecipes() {
  const recent = getRecentRecipes();
  const recentContainer = document.querySelector("#recentRecipes");

  if (!recentContainer) return;

  if (!recent || recent.length === 0) {
    recentContainer.innerHTML = `
      <p class="empty-message">Recipes you open will appear here.</p>
    `;
    return;
  }

  recentContainer.innerHTML = recent
    .map((meal) => createRecipeCard(meal))
    .join("");
}

initializeDarkMode();
loadDefaultRecipes();
loadHeroImage();
renderSearchHistory();
renderRecentRecipes();
