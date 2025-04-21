import { createFilterDropdown } from "../components/filterDropdown/factory/filterDropdownFactory.js";
import { createSelectedItem } from "../components/filterDropdown/factory/selectedItemFactory.js";
import { createAvailableItem } from "../components/filterDropdown/factory/availableItemFactory.js";
import { createFilterTag } from "../components/filterTags/factory/create-filter-tags.js";
import { INGREDIENTS, APPLIANCE, USTENSILS, DROPDOWN_FILTER_SECTION, FILTER_TYPES } from "../../config/config.js";
import { capitalize } from "../utils/utils.js";
class FilterManager {
  constructor() {
    this.dropdowns = this.createFilterDropdowns();
  }

  createFilterDropdowns() {
    return FILTER_TYPES.map((filterTypes) => createFilterDropdown(filterTypes));
  }

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

  filterDropdowns_addToDOM() {
    const filterDropdownSection = document.getElementById("filter-dropdowns-section");
    this.dropdowns.forEach((dropdown) => {
      filterDropdownSection.appendChild(dropdown);
    });
  }

  dropdowns_addSelectedItems(labelSet, filterType) {
    const id = `${filterType.key}-${DROPDOWN_FILTER_SECTION.selected}`;
    const container = document.getElementById(id);
    if (!container) {
      console.error(`${id} Does not exits`);
      return;
    }

    labelSet.forEach((label) => {
      container.appendChild(createSelectedItem(capitalize(label)));
    });
  }

  dropdowns_addAvailableItems(labelSet, filterType) {
    const id = `${filterType.key}-${DROPDOWN_FILTER_SECTION.available}`;
    const container = document.getElementById(id);
    if (!container) {
      console.error(`${id} Does not exits`);
      return;
    }

    labelSet.forEach((label) => {
      container.appendChild(createAvailableItem(capitalize(label)));
    });
  }

  dropdowns_clearInput(filterType) {
    document.getElementById(`${filterType.key}-search`).value = "";
  }

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

  filterTags_addToDOM(labelSet) {
    const container = document.getElementById("filter-tags-section");
    labelSet.forEach((label) => {
      container.appendChild(createFilterTag(capitalize(label)));
    });
  }

  filterTags_clearTags() {
    const container = document.getElementById("filter-tags-section");
    container.innerHTML = "";
  }

  filters_updateRecipeCount(recipes) {
    const countElement = document.getElementById("recipe-count");
    const count = recipes.length;
    countElement.textContent = `${count} recette${count > 1 ? "s" : ""}`;
  }
}

export { FilterManager };
