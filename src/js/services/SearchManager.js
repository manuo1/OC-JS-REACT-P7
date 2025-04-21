import { RECIPES } from "../../data/recipes.js";
import { INGREDIENTS, APPLIANCE, USTENSILS } from "../../config/config.js";
import {
  getIngredientsSetFromRecipe,
  getUstensilsSetFromRecipe,
  getApplianceSetFromRecipe,
  getUnselectedItemsFromRecipes,
  getFilteredItemsBySearchInput,
  recipeHasAllSelectedItems,
} from "./recipes.js";
class SearchManager {
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

  recipeHasAllSelectedIngredients(recipe) {
    return recipeHasAllSelectedItems(recipe, this.selectedIngredients, getIngredientsSetFromRecipe);
  }

  recipeHasAllSelectedUstensils(recipe) {
    return recipeHasAllSelectedItems(recipe, this.selectedUstensils, getUstensilsSetFromRecipe);
  }

  recipeHasAllSelectedAppliances(recipe) {
    return recipeHasAllSelectedItems(recipe, this.selectedAppliances, getApplianceSetFromRecipe);
  }

  updateFilteredRecipes() {
    this.filteredRecipes = this.mainSearchResults.filter((recipe) => {
      return (
        this.recipeHasAllSelectedIngredients(recipe) &&
        this.recipeHasAllSelectedUstensils(recipe) &&
        this.recipeHasAllSelectedAppliances(recipe)
      );
    });
  }

  clearSearchInputValue(filterType) {
    switch (filterType) {
      case INGREDIENTS:
        this.ingredientSearchInputValue = "";
        break;
      case APPLIANCE:
        this.applianceSearchInputValue = "";
        break;
      case USTENSILS:
        this.ustensilSearchInputValue = "";
        break;
      default:
        console.warn(`Unknown filterType : ${filterType}`);
    }
  }

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
}

export { SearchManager };
