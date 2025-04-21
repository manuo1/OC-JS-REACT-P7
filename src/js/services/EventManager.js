import { DROPDOWN_FILTER_SECTION, FILTER_TYPES } from "../../config/config.js";

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
    FILTER_TYPES.forEach((filterType) => {
      const ul = document.getElementById(`${filterType.key}-${DROPDOWN_FILTER_SECTION.available}`);

      ul.addEventListener("click", (event) => {
        const li = event.target.closest("li");
        if (!li || !li.dataset.value) return;

        this.searchManager.addToSelected(filterType, li.dataset.value);
        this.filterManager.dropdowns_clearInput(filterType);
        this.searchManager.setSearchInputValue(filterType, "");
        this.page_updateFiltersAndRecipes();
      });
    });
  }

  filterDropdowns_onClickRemoveItemFromSelected() {
    FILTER_TYPES.forEach((filterType) => {
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
    FILTER_TYPES.forEach((filterType) => {
      const input = document.getElementById(`${filterType.key}-search`);
      input.addEventListener("input", (event) => {
        this.searchManager.setSearchInputValue(filterType, event.target.value);
        this.page_updateFiltersAndRecipes();
      });
    });
  }

  filterDropdowns_onClickClearInput() {
    FILTER_TYPES.forEach((filterType) => {
      const clearButton = document.getElementById(`${filterType.key}-search-clear`);
      clearButton.addEventListener("click", () => {
        this.filterManager.dropdowns_clearInput(filterType);
        this.searchManager.setSearchInputValue(filterType, "");
        this.page_updateFiltersAndRecipes();
      });
    });
  }

  filterTags_OnClickRemoveTag() {
    const filterTagsSection = document.getElementById("filter-tags-section");

    filterTagsSection.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const tagElement = button.closest("div");
      if (tagElement) {
        FILTER_TYPES.forEach((filterType) => {
          this.searchManager.removeToSelected(filterType, tagElement.dataset.value);
        });
        this.page_updateFiltersAndRecipes();
      }
    });
  }
}

export { EventManager };
