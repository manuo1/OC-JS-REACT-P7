import { createFilterDropdown } from "./filterDropdown/factory/create-one-filter-dropdown.js";
import { createSelectedItem } from "./filterDropdown/factory/create-selected-item.js";
import { createAvailableItem } from "./filterDropdown/factory/create-available-item.js";
import { createFilterTag } from "./filterTags/factory/create-filter-tags.js";
import { INGREDIENTS, APPLIANCE, USTENSILS, DROPDOWN_FILTER_SECTION, FILTER_TYPES } from "../../../config/config.js";
import { capitalize } from "../../utils/utils.js";
class FilterManager {
  constructor() {
    this.dropdowns = this.createFilterDropdowns();
  }

  createFilterDropdowns() {
    return FILTER_TYPES.map((filterTypes) => createFilterDropdown(filterTypes));
  }

  filters_updateInnerElements(searchState) {
    this.dropdowns_clearLists();
    this.dropdowns_addAvailableItems(searchState.getFilteredRecipesAppliances(), APPLIANCE);
    this.dropdowns_addAvailableItems(searchState.getFilteredRecipesIngredients(), INGREDIENTS);
    this.dropdowns_addAvailableItems(searchState.getFilteredRecipesUstensils(), USTENSILS);
    this.dropdowns_addSelectedItems(searchState.selectedAppliances, APPLIANCE);
    this.dropdowns_addSelectedItems(searchState.selectedIngredients, INGREDIENTS);
    this.dropdowns_addSelectedItems(searchState.selectedUstensils, USTENSILS);
    this.filterTags_clearTags();
    this.filterTags_addToDOM([
      ...searchState.selectedAppliances,
      ...searchState.selectedIngredients,
      ...searchState.selectedUstensils,
    ]);
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
}

export { FilterManager };
