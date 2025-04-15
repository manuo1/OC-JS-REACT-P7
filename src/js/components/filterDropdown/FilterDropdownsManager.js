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

  display() {
    const filterDropdownSection = document.getElementById("filter-dropdowns-section");
    this.dropdowns.forEach((dropdown) => {
      filterDropdownSection.appendChild(dropdown);
    });
  }

  setupToggles() {
    const keys = FILTER_TYPES.map((item) => item.key);
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

  updateItems(searchState) {
    this.clearAvailableLists();

    this.addItems(searchState.getFilteredRecipesAppliances(), APPLIANCE, DROPDOWN_FILTER_SECTION.available);
    this.addItems(searchState.getFilteredRecipesIngredients(), INGREDIENTS, DROPDOWN_FILTER_SECTION.available);
    this.addItems(searchState.getFilteredRecipesUstensils(), USTENSILS, DROPDOWN_FILTER_SECTION.available);
    this.addItems(searchState.selectedIngredients, APPLIANCE, DROPDOWN_FILTER_SECTION.selected);
    this.addItems(searchState.selectedUstensils, INGREDIENTS, DROPDOWN_FILTER_SECTION.selected);
    this.addItems(searchState.selectedAppliances, USTENSILS, DROPDOWN_FILTER_SECTION.selected);
  }

  addItems(labelList, filterType, sectionList) {
    labelList.forEach((value) => {
      this.addItem(capitalize(value), filterType, sectionList);
    });
  }

  addItem(label, filterType, sectionList) {
    const id = `${filterType.key}-${sectionList}`;
    const container = document.getElementById(id);
    if (!container) {
      console.error(`${id} Does not exits`);
      return;
    }
    switch (sectionList) {
      case DROPDOWN_FILTER_SECTION.selected:
        container.appendChild(createSelectedItem(label));
        break;

      case DROPDOWN_FILTER_SECTION.available:
        container.appendChild(createAvailableItem(label));
        break;

      default:
        console.error(`${id} Does not exits`);
        break;
    }
  }

  clearList(filterType, sectionList) {
    const id = `${filterType.key}-${sectionList}`;
    const container = document.getElementById(id);

    if (!container) {
      console.error(`${id} does not exist`);
      return;
    }

    container.innerHTML = "";
  }

  clearAvailableLists() {
    FILTER_TYPES.forEach((filterType) => {
      this.clearList(filterType, DROPDOWN_FILTER_SECTION.available);
    });
  }
}

export { FilterDropdownsManager };
