import { FilterDropdownsManager } from "./components/filterDropdown/FilterDropdownsManager.js";
import { SearchState } from "./services/SearchState.js";

function initPage() {
  const filterDropdowns = new FilterDropdownsManager();
  const searchState = new SearchState();
  console.log(searchState.getFilteredRecipesAppliances());
  console.log(searchState.getFilteredRecipesIngredients());
  console.log(searchState.getFilteredRecipesUstensils());
  filterDropdowns.display();
  filterDropdowns.setupToggles();
}

window.addEventListener("DOMContentLoaded", initPage);
