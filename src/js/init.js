import { FilterDropdownsManager } from "./components/filterDropdown/FilterDropdownsManager.js";
import { SearchManager } from "./services/SearchManager.js";
import { EventManager } from "./services/EventManager.js";

function initPage() {
  const filterDropdowns = new FilterDropdownsManager();
  const searchManager = new SearchManager();
  const eventManager = new EventManager(searchManager, filterDropdowns);
  filterDropdowns.addToDOM();
  filterDropdowns.updateInnerElements(searchManager);
  eventManager.filterDropdowns_initToggles();
  eventManager.filterDropdowns_onClickAddAvailableToSelected();
  eventManager.filterDropdowns_onClickRemoveItemFromSelected();
  eventManager.filterDropdowns_filterAvailableAccordingToInput();
  eventManager.filterDropdowns_onClickClearInput();
  eventManager.filterDropdowns_OnClickRemoveTag();
}

window.addEventListener("DOMContentLoaded", initPage);
