import { FilterDropdownsManager } from "./components/filterDropdown/FilterDropdownsManager.js";
import { SearchState } from "./services/SearchState.js";

function initPage() {
  const filterDropdowns = new FilterDropdownsManager();
  const searchState = new SearchState();
  filterDropdowns.display();
  filterDropdowns.setupToggles();
  filterDropdowns.updateItems(searchState);
}

window.addEventListener("DOMContentLoaded", initPage);
