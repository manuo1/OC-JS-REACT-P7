import { normalize } from "../utils/utils.js";

function refreshRecipesByMainSearch(searchText, recipeList) {
  if (searchText === "" || searchText.length < 3) {
    return recipeList;
  }

  const normalizedSearch = normalize(searchText);
  const results = [];

  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];

    // search in recipe name
    if (normalize(recipe.name).includes(normalizedSearch)) {
      results.push(recipe);
      continue;
    }

    // search in recipe description
    if (normalize(recipe.description).includes(normalizedSearch)) {
      results.push(recipe);
      continue;
    }

    // search in recipe ingredients
    let j = 0;
    while (j < recipe.ingredients.length) {
      if (normalize(recipe.ingredients[j].ingredient).includes(normalizedSearch)) {
        results.push(recipe);
        break;
      }
      j++;
    }
  }

  return results;
}

export { refreshRecipesByMainSearch };
