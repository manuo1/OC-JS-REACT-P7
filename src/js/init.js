import { FilterManager } from "./components/filters/FilterManager.js";
import { SearchManager } from "./services/SearchManager.js";
import { EventManager } from "./services/EventManager.js";

function initPage() {
  const filterManager = new FilterManager();
  const searchManager = new SearchManager();
  const eventManager = new EventManager(searchManager, filterManager);
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
