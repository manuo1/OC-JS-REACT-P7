import { INGREDIENTS, APPLIANCE, USTENSILS, DROPDOWN_FILTER_SECTION, FILTER_TYPES } from "../../config/config.js";

class EventManager {
  constructor(searchState, filterDropdowns) {
    this.searchManager = searchState;
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

  filterDropdowns_onClickAddAvailableToSelected() {
    const availableSection = DROPDOWN_FILTER_SECTION.available;

    // Ingredients Filter
    const availableIngredientsUl = document.getElementById(`${INGREDIENTS.key}-${availableSection}`);
    availableIngredientsUl.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchManager.selectedIngredients.add(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchManager, this);
    });

    // Appliances Filter
    const availableAppliancesUl = document.getElementById(`${APPLIANCE.key}-${availableSection}`);
    availableAppliancesUl.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchManager.selectedAppliances.add(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchManager, this);
    });

    // Ustensils Filter
    const availableUstensilsUl = document.getElementById(`${USTENSILS.key}-${availableSection}`);
    availableUstensilsUl.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchManager.selectedUstensils.add(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchManager, this);
    });
  }

  filterDropdowns_onClickRemoveItemToSelected() {
    const selectedSection = DROPDOWN_FILTER_SECTION.selected;

    // Ingredients Filter
    const selectedIngredientsUl = document.getElementById(`${INGREDIENTS.key}-${selectedSection}`);
    selectedIngredientsUl.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      const li = button.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchManager.selectedIngredients.delete(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchManager, this);
    });

    // Appliances Filter
    const selectedAppliancesUl = document.getElementById(`${APPLIANCE.key}-${selectedSection}`);
    selectedAppliancesUl.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      const li = button.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchManager.selectedAppliances.delete(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchManager, this);
    });

    // Ustensils Filter
    const selectedUstensilsUl = document.getElementById(`${USTENSILS.key}-${selectedSection}`);
    selectedUstensilsUl.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      const li = button.closest("li");
      if (!li || !li.dataset.value) return;
      this.searchManager.selectedUstensils.delete(li.dataset.value.toLowerCase());
      this.filterDropdowns.updateInnerElements(this.searchManager, this);
    });
  }

  filterDropdowns_filterAvailableAccordingToInput() {
    // Ingredients Filter
    const ingredientsSearchInptut = document.getElementById(`${INGREDIENTS.key}-search`);
    ingredientsSearchInptut.addEventListener("input", (event) => {
      this.searchManager.ingredientSearchInputValue = event.target.value.toLowerCase();
      this.filterDropdowns.updateInnerElements(this.searchManager, this);
    });

    // Appliances Filter
    const appliancesSearchInptut = document.getElementById(`${APPLIANCE.key}-search`);
    appliancesSearchInptut.addEventListener("input", (event) => {
      this.searchManager.applianceSearchInputValue = event.target.value.toLowerCase();
      this.filterDropdowns.updateInnerElements(this.searchManager, this);
    });

    // Ustensils Filter
    const ustensilsSearchInptut = document.getElementById(`${USTENSILS.key}-search`);
    ustensilsSearchInptut.addEventListener("input", (event) => {
      this.searchManager.ustensilSearchInputValue = event.target.value.toLowerCase();
      this.filterDropdowns.updateInnerElements(this.searchManager, this);
    });
  }
}

export { EventManager };
