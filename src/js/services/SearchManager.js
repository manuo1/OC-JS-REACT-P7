import { RECIPES } from "../../data/recipes.js";
import { normalize } from "../utils/utils.js";
class SearchManager {
  constructor() {
    this.searchText = "";
    this.selectedIngredients = new Set();
    this.selectedUstensils = new Set();
    this.selectedAppliances = new Set();
    this.filteredRecipes = [...RECIPES];
    this.ingredientSearchInputValue = "";
    this.ustensilSearchInputValue = "";
    this.applianceSearchInputValue = "";
  }

  updateFilteredRecipes() {
    this.filteredRecipes = [...RECIPES]; // tempo
  }

  getFilteredRecipesIngredients() {
    const ingredientsList = [];
    // Level 1 on filtered recipes
    this.filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((item) => {
        const ingredient = item.ingredient.toLowerCase();
        if (!this.selectedIngredients.has(ingredient)) {
          ingredientsList.push(ingredient);
        }
      });
    });
    // Level 2 on Filter input
    const filteredIngredientsList = ingredientsList.filter((item) =>
      normalize(item).toLowerCase().includes(normalize(this.ingredientSearchInputValue.toLowerCase()))
    );

    return new Set(filteredIngredientsList.sort());
  }

  getFilteredRecipesUstensils() {
    // Level 1 on filtered recipes
    const ustensilsList = [];
    this.filteredRecipes.forEach((recipe) => {
      recipe.ustensils.forEach((item) => {
        const ustensil = item.toLowerCase();

        if (!this.selectedUstensils.has(ustensil)) {
          ustensilsList.push(ustensil);
        }
      });
    });
    // Level 2 on Filter input
    const filteredUstensilList = ustensilsList.filter((item) =>
      normalize(item).toLowerCase().includes(normalize(this.ustensilSearchInputValue.toLowerCase()))
    );
    return new Set(filteredUstensilList.sort());
  }

  getFilteredRecipesAppliances() {
    // Level 1 on filtered recipes
    const appliancesList = [];
    this.filteredRecipes.forEach((recipe) => {
      const appliance = recipe.appliance.toLowerCase();

      if (!this.selectedAppliances.has(appliance)) {
        appliancesList.push(appliance);
      }
    });
    // Level 2 on Filter input
    const filteredAppliancesList = appliancesList.filter((item) =>
      normalize(item).toLowerCase().includes(normalize(this.applianceSearchInputValue.toLowerCase()))
    );
    return new Set(filteredAppliancesList.sort());
  }
}

export { SearchManager };
