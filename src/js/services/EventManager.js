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

    // Ingredients Filter
    const availableIngredientsUl = document.getElementById(`${INGREDIENTS.key}-${availableSection}`);
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

  filterDropdown_onClickRemoveItemToSelected() {
    const selectedSection = DROPDOWN_FILTER_SECTION.selected;

    // Ingredients Filter
    const selectedIngredientsUl = document.getElementById(`${INGREDIENTS.key}-${selectedSection}`);
    selectedIngredientsUl.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      const li = button.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchState.selectedIngredients.delete(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchState, this);
    });

    // Appliances Filter
    const selectedAppliancesUl = document.getElementById(`${APPLIANCE.key}-${selectedSection}`);
    selectedAppliancesUl.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      const li = button.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchState.selectedAppliances.delete(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchState, this);
    });

    // Ustensils Filter
    const selectedUstensilsUl = document.getElementById(`${USTENSILS.key}-${selectedSection}`);
    selectedUstensilsUl.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      const li = button.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchState.selectedUstensils.delete(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchState, this);
    });
  }
}
export { EventManager };
