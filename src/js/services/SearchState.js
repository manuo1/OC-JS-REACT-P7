import { RECIPES } from "../../data/recipes.js";

class SearchState {
  constructor() {
    this.searchText = "";
    this.selectedIngredients = new Set();
    this.selectedUstensils = new Set();
    this.selectedAppliances = new Set();
    this.filteredRecipes = [...RECIPES];
  }

  reset() {
    this.searchText = "";
    this.selectedIngredients.clear();
    this.selectedUstensils.clear();
    this.selectedAppliances.clear();
    this.filteredRecipes = [...RECIPES];
  }

  updateFilteredRecipes() {
    this.filteredRecipes = [...RECIPES]; // tempo
  }

  getFilteredRecipesIngredients() {
    const ingredientsList = [];

    this.filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((item) => {
        const ingredient = item.ingredient.toLowerCase();
        if (!this.selectedIngredients.has(ingredient)) {
          ingredientsList.push(ingredient);
        }
      });
    });

    return new Set(ingredientsList.sort());
  }

  getFilteredRecipesUstensils() {
    const ustensilsList = [];

    this.filteredRecipes.forEach((recipe) => {
      recipe.ustensils.forEach((item) => {
        const ustensil = item.toLowerCase();

        if (!this.selectedUstensils.has(ustensil)) {
          ustensilsList.push(ustensil);
        }
      });
    });

    return new Set(ustensilsList.sort());
  }

  getFilteredRecipesAppliances() {
    const appliancesList = [];

    this.filteredRecipes.forEach((recipe) => {
      const appliance = recipe.appliance.toLowerCase();

      if (!this.selectedAppliances.has(appliance)) {
        appliancesList.push(appliance);
      }
    });

    return new Set(appliancesList.sort());
  }
}

export { SearchState };
