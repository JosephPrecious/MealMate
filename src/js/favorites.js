import "../css/style.css";

import { getFavorites, removeFavorite } from "./storage.js";
import { initializeDarkMode } from "./darkmode.js";

const container = document.querySelector("#favoritesContainer");

function renderFavorites() {
  const favorites = getFavorites();

  if (!favorites || favorites.length === 0) {
    container.innerHTML = "<p>No favorites saved yet.</p>";
    return;
  }

  container.innerHTML = favorites
    .map(
      (recipe) => `
      <div class="recipe-card">
        <a href="/recipe.html?id=${recipe.idMeal}">
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
          <h3>${recipe.strMeal}</h3>
        </a>

        <button class="remove-btn" data-id="${recipe.idMeal}">
          Remove
        </button>
      </div>
    `
    )
    .join("");

  addRemoveEvents();
}

function addRemoveEvents() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFavorite(btn.dataset.id);
      renderFavorites();
    });
  });
}

renderFavorites();
initializeDarkMode();