import { INGREDIENTS, APPLIANCE, USTENSILS, DROPDOWN_FILTER_SECTION, FILTER_TYPES } from "../../config/config.js";

class EventManager {
  constructor(searchManager, filterManager, recipeManager) {
    this.searchManager = searchManager;
    this.filterManager = filterManager;
    this.recipeManager = recipeManager;
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

  page_updateFiltersAndRecipes() {
    this.searchManager.updateFilteredRecipes();
    this.filterManager.filters_updateAllFilters(this.searchManager, this);
    this.recipeManager.recipes_addToDOM();
  }

  filterDropdowns_onClickAddAvailableToSelected() {
    const filterTypes = [INGREDIENTS, APPLIANCE, USTENSILS];

    filterTypes.forEach((filterType) => {
      const ul = document.getElementById(`${filterType.key}-${DROPDOWN_FILTER_SECTION.available}`);

      ul.addEventListener("click", (event) => {
        const li = event.target.closest("li");
        if (!li || !li.dataset.value) return;

        this.searchManager.addToSelected(filterType, li.dataset.value);
        this.filterManager.dropdowns_clearInput(filterType);
        this.searchManager.clearSearchInputValue(filterType);
        this.page_updateFiltersAndRecipes();
      });
    });
  }

  filterDropdowns_onClickRemoveItemFromSelected() {
    const filterTypes = [INGREDIENTS, APPLIANCE, USTENSILS];

    filterTypes.forEach((filterType) => {
      const ul = document.getElementById(`${filterType.key}-${DROPDOWN_FILTER_SECTION.selected}`);

      ul.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        const li = button?.closest("li");
        if (!li || !li.dataset.value) return;

        this.searchManager.removeToSelected(filterType, li.dataset.value);
        this.page_updateFiltersAndRecipes();
      });
    });
  }

  filterDropdowns_filterAvailableAccordingToInput() {
    // Ingredients Filter
    const ingredientsSearchInptut = document.getElementById(`${INGREDIENTS.key}-search`);
    ingredientsSearchInptut.addEventListener("input", (event) => {
      this.searchManager.ingredientSearchInputValue = event.target.value;
      this.page_updateFiltersAndRecipes();
    });

    // Appliances Filter
    const appliancesSearchInptut = document.getElementById(`${APPLIANCE.key}-search`);
    appliancesSearchInptut.addEventListener("input", (event) => {
      this.searchManager.applianceSearchInputValue = event.target.value;
      this.page_updateFiltersAndRecipes();
    });

    // Ustensils Filter
    const ustensilsSearchInptut = document.getElementById(`${USTENSILS.key}-search`);
    ustensilsSearchInptut.addEventListener("input", (event) => {
      this.searchManager.ustensilSearchInputValue = event.target.value;
      this.page_updateFiltersAndRecipes();
    });
  }

  filterDropdowns_onClickClearInput() {
    // Ingredients Filter
    const ingredientsSearchInptutClear = document.getElementById(`${INGREDIENTS.key}-search-clear`);
    ingredientsSearchInptutClear.addEventListener("click", () => {
      this.filterManager.dropdowns_clearInput(INGREDIENTS);
      this.searchManager.ingredientSearchInputValue = "";
      this.page_updateFiltersAndRecipes();
    });

    // Appliances Filter
    const appliancesSearchInptutClear = document.getElementById(`${APPLIANCE.key}-search-clear`);
    appliancesSearchInptutClear.addEventListener("click", () => {
      this.filterManager.dropdowns_clearInput(APPLIANCE);
      this.searchManager.applianceSearchInputValue = "";
      this.page_updateFiltersAndRecipes();
    });

    // Ustensils Filter
    const ustensilsSearchInptutClear = document.getElementById(`${USTENSILS.key}-search-clear`);
    ustensilsSearchInptutClear.addEventListener("click", () => {
      this.filterManager.dropdowns_clearInput(USTENSILS);
      this.searchManager.ustensilSearchInputValue = "";
      this.page_updateFiltersAndRecipes();
    });
  }

  filterTags_OnClickRemoveTag() {
    const filterTagsSection = document.getElementById("filter-tags-section");

    filterTagsSection.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;

      const tagElement = button.closest("div");
      if (tagElement) {
        const value = tagElement.dataset.value;
        this.searchManager.selectedIngredients.delete(value);
        this.searchManager.selectedAppliances.delete(value);
        this.searchManager.selectedUstensils.delete(value);
        this.page_updateFiltersAndRecipes();
      }
    });
  }
}

export { EventManager };
