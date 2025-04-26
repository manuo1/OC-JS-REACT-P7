import { createFilterDropdown } from "../components/filterDropdown/factory/filterDropdownFactory.js";
import { createSelectedItem } from "../components/filterDropdown/factory/selectedItemFactory.js";
import { createAvailableItem } from "../components/filterDropdown/factory/availableItemFactory.js";
import { createFilterTag } from "../components/filterTags/factory/create-filter-tags.js";
import { INGREDIENTS, APPLIANCE, USTENSILS, DROPDOWN_FILTER_SECTION, FILTER_TYPES } from "../../config/config.js";
import { dropdowns_addItems } from "../services/filters.js";

/**
 * Manages the filter dropdowns and the filter tags in the application.
 */
class FilterManager {
  /**
   * Initializes the FilterManager by creating filter dropdowns.
   */
  constructor() {
    this.dropdowns = this.createFilterDropdowns();
  }

  /**
   * Creates the filter dropdowns based on the filter types defined in FILTER_TYPES.
   * @returns {HTMLElement[]} An array of dropdown elements.
   */
  createFilterDropdowns() {
    return FILTER_TYPES.map((filterTypes) => createFilterDropdown(filterTypes));
  }

  /**
   * Updates all filters by clearing the previous items and adding new ones based on the filtered recipes.
   * Also updates the displayed filter tags and recipe count.
   * @param {SearchManager} searchManager - The SearchManager instance used to access filtered recipes.
   */
  filters_updateAllFilters(searchManager) {
    this.dropdowns_clearLists();
    this.dropdowns_addAvailableItems(searchManager.getFilteredRecipesAppliances(), APPLIANCE);
    this.dropdowns_addAvailableItems(searchManager.getFilteredRecipesIngredients(), INGREDIENTS);
    this.dropdowns_addAvailableItems(searchManager.getFilteredRecipesUstensils(), USTENSILS);
    this.dropdowns_addSelectedItems(searchManager.selectedAppliances, APPLIANCE);
    this.dropdowns_addSelectedItems(searchManager.selectedIngredients, INGREDIENTS);
    this.dropdowns_addSelectedItems(searchManager.selectedUstensils, USTENSILS);
    this.filterTags_clearTags();
    this.filterTags_addToDOM([
      ...searchManager.selectedAppliances,
      ...searchManager.selectedIngredients,
      ...searchManager.selectedUstensils,
    ]);
    this.filters_updateRecipeCount(searchManager.filteredRecipes);
  }

  /**
   * Adds all the filter dropdowns to the DOM.
   */
  filterDropdowns_addToDOM() {
    const filterDropdownSection = document.getElementById("filter-dropdowns-section");
    this.dropdowns.forEach((dropdown) => {
      filterDropdownSection.appendChild(dropdown);
    });
  }

  /**
   * Adds the selected items (e.g., selected ingredients, appliances) to the corresponding filter dropdown.
   * @param {Set<string>} labelSet - The set of selected labels (e.g., selected appliances).
   * @param {string} filterType - The type of filter (e.g., APPLIANCE).
   */
  dropdowns_addSelectedItems(labelSet, filterType) {
    dropdowns_addItems(labelSet, filterType, DROPDOWN_FILTER_SECTION.selected, createSelectedItem);
  }

  /**
   * Adds the available items (e.g., available ingredients, appliances) to the corresponding filter dropdown.
   * @param {Set<string>} labelSet - The set of available labels (e.g., available appliances).
   * @param {string} filterType - The type of filter (e.g., APPLIANCE).
   */
  dropdowns_addAvailableItems(labelSet, filterType) {
    dropdowns_addItems(labelSet, filterType, DROPDOWN_FILTER_SECTION.available, createAvailableItem);
  }

  /**
   * Clears the input value of a specific filter dropdown.
   * @param {Object} filterType - The type of filter to clear (e.g., INGREDIENTS, APPLIANCE, USTENSILS).
   */
  dropdowns_clearInput(filterType) {
    document.getElementById(`${filterType.key}-search`).value = "";
  }

  /**
   * Clears all the filter dropdown lists (both available and selected items).
   */
  dropdowns_clearLists() {
    FILTER_TYPES.forEach((filterType) => {
      Object.values(DROPDOWN_FILTER_SECTION).forEach((sectionList) => {
        const id = `${filterType.key}-${sectionList}`;
        const container = document.getElementById(id);

        if (!container) {
          console.error(`${id} does not exist`);
          return;
        }

        container.innerHTML = "";
      });
    });
  }

  /**
   * Adds filter tags to the DOM.
   * @param {string[]} labelSet - The list of selected tags to be displayed (e.g., selected appliances).
   */
  filterTags_addToDOM(labelSet) {
    const container = document.getElementById("filter-tags-section");
    labelSet.forEach((label) => {
      container.appendChild(createFilterTag(label));
    });
  }

  /**
   * Clears all the filter tags from the DOM.
   */
  filterTags_clearTags() {
    const container = document.getElementById("filter-tags-section");
    container.innerHTML = "";
  }

  /**
   * Updates the recipe count displayed on the page.
   * @param {Object[]} recipes - The list of recipes to count.
   */
  filters_updateRecipeCount(recipes) {
    const countElement = document.getElementById("recipe-count");
    const count = recipes.length;
    countElement.textContent = `${count} recette${count > 1 ? "s" : ""}`;
  }
}

export { FilterManager };
