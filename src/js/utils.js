export function createRecipeCard(recipe) {
  return `
    <div class="recipe-card">
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
      <h3>${recipe.strMeal}</h3>
    </div>
  `;
}