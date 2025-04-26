import { DROPDOWN_FILTER_SECTION, FILTER_TYPES } from "../../config/config.js";
const mainSearchInput = document.getElementById("main-search-bar-input");
const mainSearchClearButton = document.getElementById("main-search-clear");

/**
 * Manages the events related to filters, main search input, and filter tags in the application.
 * Handles toggling of dropdowns, adding/removing selected filters, and updating the recipes displayed.
 */
class EventManager {
  /**
   * Initializes the EventManager with references to the SearchManager, FilterManager, and RecipeManager.
   * @param {SearchManager} searchManager - The instance of the SearchManager to manage search results.
   * @param {FilterManager} filterManager - The instance of the FilterManager to manage filters.
   * @param {RecipeManager} recipeManager - The instance of the RecipeManager to manage recipe display.
   */
  constructor(searchManager, filterManager, recipeManager) {
    this.searchManager = searchManager;
    this.filterManager = filterManager;
    this.recipeManager = recipeManager;
  }

  /**
   * Initializes the toggle behavior for the filter dropdowns.
   * Each dropdown can be opened or closed by clicking the corresponding filter button.
   */
  filterDropdowns_initToggles() {
    const keys = FILTER_TYPES.map((filterType) => filterType.key);

    keys.forEach((filterTypeKey) => {
      const filterButton = document.getElementById(`${filterTypeKey}-filter-button`);
      const dropdownWrapper = document.getElementById(`${filterTypeKey}-dropdown-wrapper`);
      const arrow = filterButton.querySelector(".arrow-icon");

      function close() {
        dropdownWrapper.classList.add("hidden");
        filterButton.setAttribute("aria-expanded", "false");
        filterButton.classList.add("rounded-b-[11px]");
        arrow.classList.remove("rotate-180");
      }
      function open() {
        dropdownWrapper.classList.remove("hidden");
        filterButton.setAttribute("aria-expanded", "true");
        filterButton.classList.remove("rounded-b-[11px]");
        arrow.classList.add("rotate-180");
      }

      filterButton.addEventListener("click", () => {
        dropdownWrapper.classList.contains("hidden") ? open() : close();
      });
    });
  }

  /**
   * Updates all filters and recipes on the page.
   * This includes updating the main search results, the filtered recipes, and the filter dropdowns.
   */
  page_updateFiltersAndRecipes() {
    this.searchManager.updateMainSearchResults();
    this.searchManager.updateFilteredRecipes();
    this.filterManager.filters_updateAllFilters(this.searchManager, this);
    this.recipeManager.recipes_addToDOM(this.searchManager.mainSearchText);
  }

  /**
   * Handles click events to add an available item (e.g., ingredient, appliance) to the selected list in the dropdowns.
   * This triggers an update of the filters and recipes.
   */
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

  /**
   * Handles click events to remove an item from the selected list in the dropdowns.
   * This triggers an update of the filters and recipes.
   */
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

  /**
   * Filters the available items in the dropdowns according to the input search.
   * This triggers an update of the filters and recipes.
   */
  filterDropdowns_filterAvailableAccordingToInput() {
    FILTER_TYPES.forEach((filterType) => {
      const input = document.getElementById(`${filterType.key}-search`);
      input.addEventListener("input", (event) => {
        this.searchManager.setSearchInputValue(filterType, event.target.value);
        this.page_updateFiltersAndRecipes();
      });
    });
  }

  /**
   * Handles the click event to clear the input value in a filter dropdown.
   * This triggers an update of the filters and recipes.
   */
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

  /**
   * Handles the click event to remove a filter tag from the page.
   * This triggers an update of the filters and recipes.
   */
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

  /**
   * Initializes the main search input to listen for user input and update the main search text value.
   * This triggers an update of the filters and recipes.
   */
  mainSearch_init() {
    mainSearchInput.addEventListener("input", (e) => {
      this.searchManager.setMainSearchTextValue(e.target.value.trim());
      this.page_updateFiltersAndRecipes();
    });
  }

  /**
   * Handles the click event to clear the main search input field.
   * This triggers an update of the filters and recipes.
   */
  mainSearch_onClickClearInput() {
    mainSearchClearButton.addEventListener("click", () => {
      mainSearchInput.value = "";
      this.searchManager.setMainSearchTextValue("");
      this.page_updateFiltersAndRecipes();
    });
  }
}

export { EventManager };
