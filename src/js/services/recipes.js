import { capitalize, normalize, normalizeSet } from "../utils/utils.js";

function getIngredientsSetFromRecipe(recipe) {
  return new Set(recipe.ingredients.map((item) => capitalize(item.ingredient)));
}

function getUstensilsSetFromRecipe(recipe) {
  return new Set(recipe.ustensils.map(capitalize));
}

function getApplianceSetFromRecipe(recipe) {
  return new Set([capitalize(recipe.appliance)]);
}

function getUnselectedItemsFromRecipes(recipeList, getItemSetFromRecipe, selectedItems) {
  const filteredItemsList = [];
  recipeList.forEach((recipe) => {
    getItemSetFromRecipe(recipe).forEach((item) => {
      if (!normalizeSet(selectedItems).has(normalize(item))) {
        filteredItemsList.push(item);
      }
    });
  });
  return filteredItemsList;
}

function getFilteredItemsBySearchInput(list, searchInput) {
  return list.filter((item) => normalize(item).includes(normalize(searchInput)));
}

function recipeHasAllSelectedItems(recipe, selectedSet, getItemSetFromRecipe) {
  if (selectedSet.size === 0) return true;
  const itemsInRecipe = normalizeSet(getItemSetFromRecipe(recipe));
  return [...normalizeSet(selectedSet)].every((selected) => itemsInRecipe.has(selected));
}

export {
  getFilteredItemsBySearchInput,
  getApplianceSetFromRecipe,
  getIngredientsSetFromRecipe,
  getUstensilsSetFromRecipe,
  getUnselectedItemsFromRecipes,
  recipeHasAllSelectedItems,
};
