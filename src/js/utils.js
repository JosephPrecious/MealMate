export function createRecipeCard(recipe) {
  return `
    <a href="./src/pages/recipe.html?id=${recipe.idMeal}" class="recipe-card">
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
      <h3>${recipe.strMeal}</h3>
    </a>
  `;
}