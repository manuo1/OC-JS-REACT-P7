import { FilterManager } from "./managers/FilterManager.js";
import { SearchManager } from "./managers/SearchManager.js";
import { EventManager } from "./managers/EventManager.js";
import { RecipeManager } from "./managers/RecipeManager.js";

function initPage() {
  const filterManager = new FilterManager();
  const searchManager = new SearchManager();
  const recipeManager = new RecipeManager(searchManager);
  const eventManager = new EventManager(searchManager, filterManager, recipeManager);

  recipeManager.recipes_addToDOM();
  filterManager.filterDropdowns_addToDOM();
  filterManager.filters_updateAllFilters(searchManager);
  eventManager.filterDropdowns_initToggles();
  eventManager.filterDropdowns_onClickAddAvailableToSelected();
  eventManager.filterDropdowns_onClickRemoveItemFromSelected();
  eventManager.filterDropdowns_filterAvailableAccordingToInput();
  eventManager.filterDropdowns_onClickClearInput();
  eventManager.filterTags_OnClickRemoveTag();
  eventManager.mainSearch_init();
  eventManager.mainSearch_onClickClearInput();
}

window.addEventListener("DOMContentLoaded", initPage);
