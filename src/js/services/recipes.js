import { capitalize, normalize, normalizeSet } from "../utils/utils.js";

/**
 * Extracts a Set of capitalized ingredients from a recipe.
 * @param {Object} recipe - The recipe object.
 * @returns {Set<string>} A Set of ingredients.
 */
function getIngredientsSetFromRecipe(recipe) {
  return new Set(recipe.ingredients.map((item) => capitalize(item.ingredient)));
}

/**
 * Extracts a Set of capitalized utensils from a recipe.
 * @param {Object} recipe - The recipe object.
 * @returns {Set<string>} A Set of utensils.
 */
function getUstensilsSetFromRecipe(recipe) {
  return new Set(recipe.ustensils.map(capitalize));
}

/**
 * Extracts a Set containing the capitalized appliance from a recipe.
 * @param {Object} recipe - The recipe object.
 * @returns {Set<string>} A Set containing the appliance.
 */
function getApplianceSetFromRecipe(recipe) {
  return new Set([capitalize(recipe.appliance)]);
}

/**
 * Returns a list of items from recipes that are not currently selected.
 * @param {Array<Object>} recipeList - List of recipe objects.
 * @param {Function} getItemSetFromRecipe - Function to extract items from a recipe.
 * @param {Set<string>} selectedItems - Set of currently selected items.
 * @returns {Array<string>} List of unselected items.
 */
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

/**
 * Filters a list of items based on a search input (normalized).
 * @param {Array<string>} list - List of items to filter.
 * @param {string} searchInput - Search string to match.
 * @returns {Array<string>} List of matching items.
 */
function getFilteredItemsBySearchInput(list, searchInput) {
  return list.filter((item) => normalize(item).includes(normalize(searchInput)));
}

/**
 * Checks if a recipe contains all selected items.
 * @param {Object} recipe - The recipe object.
 * @param {Set<string>} selectedSet - Set of selected items.
 * @param {Function} getItemSetFromRecipe - Function to extract items from a recipe.
 * @returns {boolean} True if the recipe contains all selected items, otherwise false.
 */
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
