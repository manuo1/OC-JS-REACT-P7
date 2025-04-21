import { FilterManager } from "./services/FilterManager.js";
import { SearchManager } from "./services/SearchManager.js";
import { EventManager } from "./services/EventManager.js";
import { RecipeManager } from "./services/RecipeManager.js";

function initPage() {
  const filterManager = new FilterManager();
  const searchManager = new SearchManager();
  const recipeManager = new RecipeManager(searchManager);
  const eventManager = new EventManager(searchManager, filterManager, recipeManager);

  recipeManager.recipes_addToDOM();
  filterManager.filterDropdowns_addToDOM();
  filterManager.filters_updateInnerElements(searchManager);
  eventManager.filterDropdowns_initToggles();
  eventManager.filterDropdowns_onClickAddAvailableToSelected();
  eventManager.filterDropdowns_onClickRemoveItemFromSelected();
  eventManager.filterDropdowns_filterAvailableAccordingToInput();
  eventManager.filterDropdowns_onClickClearInput();
  eventManager.filterTags_OnClickRemoveTag();
}

window.addEventListener("DOMContentLoaded", initPage);
