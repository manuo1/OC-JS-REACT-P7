import { createFilterDropdown } from "./factory/create-one-filter-dropdown.js";
import { createSelectedItem } from "./factory/create-selected-item.js";
import { createAvailableItem } from "./factory/create-available-item.js";
import { DROPDOWN_FILTER_SECTION as section, FILTER_TYPES } from "../../../config/config.js";

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

  addItemInList(value, filterType, list) {
    const id = `${filterType.key}-${list}`;
    const container = document.getElementById(id);
    if (!container) {
      console.error(`${id} Does not exits`);
      return;
    }
    switch (list) {
      case section.selected:
        container.appendChild(createSelectedItem(value));
        break;

      case section.available:
        container.appendChild(createAvailableItem(value));
        break;

      default:
        console.error(`${id} Does not exits`);
        break;
    }
  }

  clearList(filterType, list) {
    const id = `${filterType.key}-${list}`;
    const container = document.getElementById(id);

    if (!container) {
      console.error(`${id} does not exist`);
      return;
    }

    container.innerHTML = "";
  }
}

export { FilterDropdownsManager };
