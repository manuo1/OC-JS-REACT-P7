import { createFilterDropdown } from "./factory/create-one-filter-dropdown.js";

/**
 * Creates an array of dropdowns from the given filter types.
 * @param {Array} filterTypes - An array of objects representing the filter types, each containing a 'key' and 'label'.
 * @returns {HTMLElement[]} - An array of DOM dropdown elements ready to be inserted
 */
function createFilterDropdownsArray(filterTypes) {
  return filterTypes.map((filterTypes) => createFilterDropdown(filterTypes));
}

/**
 * Displays the generated dropdowns in a specified section of the DOM.
 * This function calls `createFilterDropdownsArray` to get the dropdowns
 * and appends them to the element with the ID "filter-dropdowns-section".
 * @param {Array} filterTypes - An array of objects representing the filter types
 * @returns {void} - No value returned, the elements are added directly to the DOM
 */
function displayFilterDropdowns(filterTypes) {
  const dropdowns = createFilterDropdownsArray(filterTypes);
  const filterDropdownSection = document.getElementById("filter-dropdowns-section");
  dropdowns.forEach((dropdown) => {
    filterDropdownSection.appendChild(dropdown);
  });
}

/**
 * Sets up toggle functionality for dropdown menus.
 * This function adds click event listeners to filter buttons, allowing users to toggle the visibility
 * of corresponding dropdown menus. It also updates the button's ARIA attributes and styles for accessibility
 * and visual feedback.
 *
 * @param {Array} filterTypes - An array of objects representing the filter types, each containing a 'key'.
 * Each 'key' is used to identify the corresponding button and dropdown in the DOM.
 * @returns {void} - No value returned, event listeners are added directly to the DOM elements.
 */
function setupDropdownToggles(filterTypes) {
  const keys = filterTypes.map((item) => item.key);
  keys.forEach((key) => {
    const filterButton = document.getElementById(`${key}-filter-button`);
    const dropdownWrapper = document.getElementById(`${key}-dropdown-wrapper`);

    filterButton.addEventListener("click", () => {
      dropdownWrapper.classList.toggle("hidden");
      filterButton.classList.toggle("rounded-b-[11px]");
      const ariaExpanded = filterButton.getAttribute("aria-expanded") === "true";
      filterButton.setAttribute("aria-expanded", !ariaExpanded);
    });
  });
}

export { createFilterDropdownsArray, displayFilterDropdowns, setupDropdownToggles };
