import { recipeCardFactory } from "../components/recipes/factory/recipeCardFactory.js";

class RecipeManager {
  constructor(searchManager) {
    this.container = document.getElementById("recipes-section");
    this.searchManager = searchManager;
  }

  recipes_addToDOM() {
    this.container.innerHTML = "";
    this.searchManager.filteredRecipes.forEach((recipe) => {
      this.container.innerHTML += recipeCardFactory(recipe);
    });
  }
}

export { RecipeManager };
