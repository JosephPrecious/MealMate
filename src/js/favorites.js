import "../css/style.css";

import { getFavorites } from "./storage.js";

const container =
  document.querySelector("#favoritesContainer");

function renderFavorites() {

  const favorites = getFavorites();

  if (favorites.length === 0) {
    container.innerHTML =
      "<p>No favorites saved yet.</p>";

    return;
  }

  container.innerHTML = favorites
    .map(
      recipe => `
      <div class="recipe-card">

        <a href="/recipe.html?id=${recipe.idMeal}">
          <img
            src="${recipe.strMealThumb}"
            alt="${recipe.strMeal}"
          />

          <h3>${recipe.strMeal}</h3>
        </a>

      </div>
    `
    )
    .join("");
}

renderFavorites();