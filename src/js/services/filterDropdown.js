import { createFilterDropdown } from "../components/filterDropdown/factory/create-one-filter-dropdown.js";
import { createSelectedItem } from "../components/filterDropdown/factory/create-selected-item.js";
import { createAvailableItem } from "../components/filterDropdown/factory/create-available-item.js";
import { DROPDOWN_FILTER_SECTION as section } from "../../config/config.js";

function createFilterDropdowns(filterTypes) {
  return filterTypes.map((filterTypes) => createFilterDropdown(filterTypes));
}

function displayFilterDropdowns(filterTypes) {
  const dropdowns = createFilterDropdowns(filterTypes);
  const filterDropdownSection = document.getElementById("filter-dropdowns-section");
  dropdowns.forEach((dropdown) => {
    filterDropdownSection.appendChild(dropdown);
  });
}

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

function addItemInDropdownFilterList(value, filterType, list) {
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

function clearDropdownFilterList(filterType, list) {
  const id = `${filterType.key}-${list}`;
  const container = document.getElementById(id);

  if (!container) {
    console.error(`${id} does not exist`);
    return;
  }

  container.innerHTML = "";
}

export {
  addItemInDropdownFilterList,
  clearDropdownFilterList,
  createFilterDropdowns,
  displayFilterDropdowns,
  setupDropdownToggles,
};
