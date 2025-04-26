import { recipeCardFactory } from "../components/recipes/factory/recipeCardFactory.js";
import { noRecipeFactory } from "../components/recipes/factory/noRecipeFactory.js";

/**
 * Manages the display of recipes in the DOM based on the filtered results from the search manager.
 */
class RecipeManager {
  /**
   * Initializes the RecipeManager with the search manager and the recipes container.
   * @param {SearchManager} searchManager - The SearchManager instance to access filtered recipes.
   */
  constructor(searchManager) {
    this.container = document.getElementById("recipes-section");
    this.searchManager = searchManager;
  }

  /**
   * Adds the filtered recipes to the DOM based on the main search text.
   * Clears the current content of the recipes container and populates it with the filtered recipes.
   * If no recipes match the search, a no-result message is added.
   * @param {string} mainSearchText - The main search text used for the search query.
   */
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
