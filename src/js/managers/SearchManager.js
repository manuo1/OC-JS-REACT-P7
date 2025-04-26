import { RECIPES } from "../../data/recipes.js";
import { INGREDIENTS, APPLIANCE, USTENSILS } from "../../config/config.js";
import {
  getIngredientsSetFromRecipe,
  getUstensilsSetFromRecipe,
  getApplianceSetFromRecipe,
  getUnselectedItemsFromRecipes,
  getFilteredItemsBySearchInput,
  recipeHasAllSelectedItems,
} from "../services/recipes.js";
import { refreshRecipesByMainSearch } from "../services/mainSearch.js";
/**
 * Manages the search functionality and filters for recipes.
 */
class SearchManager {
  /**
   * Initializes the SearchManager instance with default values.
   */
  constructor() {
    // main search
    this.mainSearchText = "";
    this.mainSearchResults = [...RECIPES];
    // filters
    this.selectedIngredients = new Set();
    this.selectedUstensils = new Set();
    this.selectedAppliances = new Set();
    this.ingredientSearchInputValue = "";
    this.ustensilSearchInputValue = "";
    this.applianceSearchInputValue = "";
    this.filteredRecipes = this.mainSearchResults;
  }

  /**
   * Gets the list of ingredients from filtered recipes that are not selected and match the input.
   * @returns {Set<string>} A Set of filtered ingredients.
   */
  getFilteredRecipesIngredients() {
    // Get all ingredients in filteredRecipes that are not already selected
    const ingredientsList = getUnselectedItemsFromRecipes(
      this.filteredRecipes,
      getIngredientsSetFromRecipe,
      this.selectedIngredients
    );
    // Get ingredients in ingredientsList that match the input
    const filteredIngredientsList = getFilteredItemsBySearchInput(ingredientsList, this.ingredientSearchInputValue);
    return new Set(filteredIngredientsList.sort());
  }

  /**
   * Gets the list of utensils from filtered recipes that are not selected and match the input.
   * @returns {Set<string>} A Set of filtered utensils.
   */
  getFilteredRecipesUstensils() {
    // Get all utensils in filteredRecipes that are not already selected
    const ustensilsList = getUnselectedItemsFromRecipes(
      this.filteredRecipes,
      getUstensilsSetFromRecipe,
      this.selectedUstensils
    );
    // Get ustensils in ustensilsList that match the input
    const filteredUstensilList = getFilteredItemsBySearchInput(ustensilsList, this.ustensilSearchInputValue);
    return new Set(filteredUstensilList.sort());
  }

  /**
   * Gets the list of appliances from filtered recipes that are not selected and match the input.
   * @returns {Set<string>} A Set of filtered appliances.
   */
  getFilteredRecipesAppliances() {
    // Get all appliances in filteredRecipes that are not already selected
    const appliancesList = getUnselectedItemsFromRecipes(
      this.filteredRecipes,
      getApplianceSetFromRecipe,
      this.selectedAppliances
    );
    // Get appliances in appliancesList that match the input
    const filteredAppliancesList = getFilteredItemsBySearchInput(appliancesList, this.applianceSearchInputValue);
    return new Set(filteredAppliancesList.sort());
  }

  /**
   * Checks if a recipe has all selected ingredients.
   * @param {Object} recipe - The recipe to check.
   * @returns {boolean} True if all selected ingredients are present in the recipe.
   */
  recipeHasAllSelectedIngredients(recipe) {
    return recipeHasAllSelectedItems(recipe, this.selectedIngredients, getIngredientsSetFromRecipe);
  }

  /**
   * Checks if a recipe has all selected utensils.
   * @param {Object} recipe - The recipe to check.
   * @returns {boolean} True if all selected utensils are present in the recipe.
   */
  recipeHasAllSelectedUstensils(recipe) {
    return recipeHasAllSelectedItems(recipe, this.selectedUstensils, getUstensilsSetFromRecipe);
  }

  /**
   * Checks if a recipe has all selected appliances.
   * @param {Object} recipe - The recipe to check.
   * @returns {boolean} True if all selected appliances are present in the recipe.
   */
  recipeHasAllSelectedAppliances(recipe) {
    return recipeHasAllSelectedItems(recipe, this.selectedAppliances, getApplianceSetFromRecipe);
  }

  /**
   * Updates the filtered recipes based on the selected filters.
   */
  updateFilteredRecipes() {
    this.filteredRecipes = this.mainSearchResults.filter((recipe) => {
      return (
        this.recipeHasAllSelectedIngredients(recipe) &&
        this.recipeHasAllSelectedUstensils(recipe) &&
        this.recipeHasAllSelectedAppliances(recipe)
      );
    });
  }

  /**
   * Sets the search input value for a specific filter type.
   * @param {string} filterType - The type of filter (e.g., "INGREDIENTS").
   * @param {string} value - The input value to set for the filter.
   */
  setSearchInputValue(filterType, value) {
    switch (filterType) {
      case INGREDIENTS:
        this.ingredientSearchInputValue = value;
        break;
      case APPLIANCE:
        this.applianceSearchInputValue = value;
        break;
      case USTENSILS:
        this.ustensilSearchInputValue = value;
        break;
      default:
        console.warn(`Unknown filterType : ${filterType}`);
    }
  }

  /**
   * Adds a value to the selected set of a specific filter type.
   * @param {string} filterType - The type of filter (e.g., "INGREDIENTS").
   * @param {string} value - The value to add to the selected set.
   */
  addToSelected(filterType, value) {
    switch (filterType) {
      case INGREDIENTS:
        this.selectedIngredients.add(value);
        break;
      case APPLIANCE:
        this.selectedAppliances.add(value);
        break;
      case USTENSILS:
        this.selectedUstensils.add(value);
        break;
      default:
        console.warn(`Unknown filterType : ${filterType}`);
    }
  }

  /**
   * Removes a value from the selected set of a specific filter type.
   * @param {string} filterType - The type of filter (e.g., "INGREDIENTS").
   * @param {string} value - The value to remove from the selected set.
   */
  removeToSelected(filterType, value) {
    switch (filterType) {
      case INGREDIENTS:
        this.selectedIngredients.delete(value);
        break;
      case APPLIANCE:
        this.selectedAppliances.delete(value);
        break;
      case USTENSILS:
        this.selectedUstensils.delete(value);
        break;
      default:
        console.warn(`Unknown filterType : ${filterType}`);
    }
  }

  /**
   * Sets the main search text value.
   * @param {string} value - The search text to set.
   */
  setMainSearchTextValue(value) {
    this.mainSearchText = value;
  }

  /**
   * Updates the main search results based on the main search text.
   */
  updateMainSearchResults() {
    this.mainSearchResults = refreshRecipesByMainSearch(this.mainSearchText, [...RECIPES]);
  }
}

export { SearchManager };
