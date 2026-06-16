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

export function getFavoriteCount() {
  return getFavorites().length;
}

export function saveSearch(query) {
  const cleanedQuery = query.trim();

  if (!cleanedQuery) return;

  let history =
    JSON.parse(localStorage.getItem("searchHistory")) || [];

  if (!history.includes(cleanedQuery)) {
    history.unshift(cleanedQuery);
  }

  history = history.slice(0, 5);

  localStorage.setItem(
    "searchHistory",
    JSON.stringify(history)
  );
}

export function getSearchHistory() {
  return (
    JSON.parse(
      localStorage.getItem("searchHistory")
    ) || []
  );
}

export function saveRecent(recipe) {
  let recent =
    JSON.parse(localStorage.getItem("recentRecipes")) || [];

  recent =
    recent.filter(
      item => item.idMeal !== recipe.idMeal
    );

  recent.unshift(recipe);

  recent = recent.slice(0, 5);

  localStorage.setItem(
    "recentRecipes",
    JSON.stringify(recent)
  );
}

export function getRecentRecipes() {
  return (
    JSON.parse(
      localStorage.getItem("recentRecipes")
    ) || []
  );
}
