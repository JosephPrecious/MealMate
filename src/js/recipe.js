import { getRecipeById } from "./api.js";
import { saveFavorite } from "./storage.js";
import "../css/style.css";

const container = document.querySelector("#recipeDetail");

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadRecipe() {
  const recipe = await getRecipeById(id);

  renderRecipe(recipe);
}

function renderRecipe(recipe) {
  if (!recipe) {
    container.innerHTML = "<p>Recipe not found</p>";
    return;
  }

  container.innerHTML = `
    <div class="recipe-detail">
      <h2>${recipe.strMeal}</h2>

      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />

      <button id="favoriteBtn">
       ❤ Save Favorite
      </button>

      <h3>Ingredients</h3>
      <ul>
        ${getIngredients(recipe)}
      </ul>

      <h3>Instructions</h3>
      <p>${recipe.strInstructions}</p>
    </div>
  `;
  document
  .querySelector("#favoriteBtn")
  .addEventListener("click", () => {

    saveFavorite(recipe);

    alert("Recipe added to favorites!");
  });
}

function getIngredients(recipe) {
  let list = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      list += `<li>${measure} ${ingredient}</li>`;
    }
  }

  return list;
}

loadRecipe();