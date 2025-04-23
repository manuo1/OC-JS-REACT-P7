import { recipeCardFactory } from "../components/recipes/factory/recipeCardFactory.js";
import { noRecipeFactory } from "../components/recipes/factory/noRecipeFactory.js";
class RecipeManager {
  constructor(searchManager) {
    this.container = document.getElementById("recipes-section");
    this.searchManager = searchManager;
  }

  recipes_addToDOM(mainSearchText) {
    this.container.innerHTML = "";
    const recipes = this.searchManager.filteredRecipes;

    if (recipes.length === 0) {
      this.container.innerHTML += noRecipeFactory(mainSearchText);
      return;
    }
    recipes.forEach((recipe) => {
      this.container.innerHTML += recipeCardFactory(recipe);
    });
  }
}

export { RecipeManager };
