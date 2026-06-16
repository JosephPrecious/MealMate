const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchRecipes(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
    );

    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export async function filterRecipesByCategory(category) {
  try {
    const response = await fetch(
      `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
    );

    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching category:", error);
    return [];
  }
}

export async function getRecipeById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`
    );

    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function getFoodImage() {
  if (!UNSPLASH_KEY) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=food&client_id=${UNSPLASH_KEY}`
    );

    const data = await response.json();

    return data.urls?.regular || null;
  } catch (error) {
    console.error("Unsplash Error:", error);
    return null;
  }
}
