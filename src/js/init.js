import { displayFilterDropdowns, setupDropdownToggles } from "./components/filterDropdown/services.js";
import { FILTER_TYPES } from "../config/filter-types.js";

/**
 * Initializes the page by setting up and displaying filter dropdowns.
 * This function is executed once the DOM content is fully loaded.
 * It displays the dropdown menus and sets up their toggle functionality.
 *
 * @returns {void} - No value returned, the initialization is applied directly to the DOM.
 */
function initPage() {
  displayFilterDropdowns(FILTER_TYPES);
  setupDropdownToggles(FILTER_TYPES);
}

window.addEventListener("DOMContentLoaded", initPage);
