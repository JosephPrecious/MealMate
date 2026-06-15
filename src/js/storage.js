const FAVORITES_KEY = "mealmate-favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorite(recipe) {
  const favorites = getFavorites();

  const exists = favorites.find(
    item => item.idMeal === recipe.idMeal
  );

  if (!exists) {
    favorites.push(recipe);

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites)
    );
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter(
    recipe => recipe.idMeal !== id
  );

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
}