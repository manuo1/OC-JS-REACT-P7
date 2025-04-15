import { FilterDropdownsManager } from "./components/filterDropdown/FilterDropdownsManager.js";

function initPage() {
  const filterDropdowns = new FilterDropdownsManager();

  filterDropdowns.display();
  filterDropdowns.setupToggles();
}

window.addEventListener("DOMContentLoaded", initPage);
