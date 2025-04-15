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
    const ingredientsSet = new Set();

    this.filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((item) => {
        ingredientsSet.add(item.ingredient);
      });
    });

    return Array.from(ingredientsSet).sort();
  }

  getFilteredRecipesUstensils() {
    const ustensilsSet = new Set();

    this.filteredRecipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        ustensilsSet.add(ustensil);
      });
    });

    return Array.from(ustensilsSet).sort();
  }

  getFilteredRecipesAppliances() {
    const appliancesSet = new Set();

    this.filteredRecipes.forEach((recipe) => {
      appliancesSet.add(recipe.appliance);
    });

    return Array.from(appliancesSet).sort();
  }
}

export { SearchState };
