import { INGREDIENTS, APPLIANCE, USTENSILS, DROPDOWN_FILTER_SECTION, FILTER_TYPES } from "../../config/config.js";

class EventManager {
  constructor(searchState, filterDropdowns) {
    this.searchState = searchState;
    this.filterDropdowns = filterDropdowns;
  }

  filterDropdowns_initToggles() {
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

  filterDropdown_onClickAddAvailableToSelected() {
    const availableSection = DROPDOWN_FILTER_SECTION.available;
    const availableIngredientsUl = document.getElementById(`${INGREDIENTS.key}-${availableSection}`);

    // Ingredients Filter
    availableIngredientsUl.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchState.selectedIngredients.add(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchState, this);
    });

    // Appliances Filter
    const availableAppliancesUl = document.getElementById(`${APPLIANCE.key}-${availableSection}`);
    availableAppliancesUl.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchState.selectedAppliances.add(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchState, this);
    });

    // Ustensils Filter
    const availableUstensilsUl = document.getElementById(`${USTENSILS.key}-${availableSection}`);
    availableUstensilsUl.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchState.selectedUstensils.add(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchState, this);
    });
  }
}
export { EventManager };
