import { createFilterDropdown } from "./factory/create-one-filter-dropdown.js";
import { createSelectedItem } from "./factory/create-selected-item.js";
import { createAvailableItem } from "./factory/create-available-item.js";
import { INGREDIENTS, APPLIANCE, USTENSILS, DROPDOWN_FILTER_SECTION, FILTER_TYPES } from "../../../config/config.js";
import { capitalize } from "../../utils/utils.js";
class FilterDropdownsManager {
  constructor() {
    this.dropdowns = this.createFilterDropdowns();
  }

  createFilterDropdowns() {
    return FILTER_TYPES.map((filterTypes) => createFilterDropdown(filterTypes));
  }

  addToDOM() {
    const filterDropdownSection = document.getElementById("filter-dropdowns-section");
    this.dropdowns.forEach((dropdown) => {
      filterDropdownSection.appendChild(dropdown);
    });
  }

  updateInnerElements(searchState) {
    this.clearLists();
    this.addAvailableItems(searchState.getFilteredRecipesAppliances(), APPLIANCE);
    this.addAvailableItems(searchState.getFilteredRecipesIngredients(), INGREDIENTS);
    this.addAvailableItems(searchState.getFilteredRecipesUstensils(), USTENSILS);
    this.addSelectedItems(searchState.selectedAppliances, APPLIANCE);
    this.addSelectedItems(searchState.selectedIngredients, INGREDIENTS);
    this.addSelectedItems(searchState.selectedUstensils, USTENSILS);
  }

  addSelectedItems(labelSet, filterType) {
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

  addAvailableItems(labelSet, filterType) {
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

  clearLists() {
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
}

export { FilterDropdownsManager };
