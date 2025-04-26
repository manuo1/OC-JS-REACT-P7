import { normalize } from "../utils/utils.js";

function refreshRecipesByMainSearch(searchText, recipeList) {
  if (searchText === "" || searchText.length < 3) {
    return recipeList;
  }

  const normalizedSearch = normalize(searchText);
  return recipeList.filter(
    (recipe) =>
      normalize(recipe.name).includes(normalizedSearch) ||
      normalize(recipe.description).includes(normalizedSearch) ||
      recipe.ingredients.some((ingredient) => normalize(ingredient.ingredient).includes(normalizedSearch))
  );
}

export { refreshRecipesByMainSearch };
