import { getRecipeById } from "./api.js";

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

      <h3>Ingredients</h3>
      <ul>
        ${getIngredients(recipe)}
      </ul>

      <h3>Instructions</h3>
      <p>${recipe.strInstructions}</p>
    </div>
  `;
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