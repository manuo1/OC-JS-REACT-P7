import { FilterDropdownsManager } from "./components/filterDropdown/FilterDropdownsManager.js";
import { SearchState } from "./services/SearchState.js";
import { EventManager } from "./services/EventManager.js";

function initPage() {
  const filterDropdowns = new FilterDropdownsManager();
  const searchState = new SearchState();
  const eventManager = new EventManager(searchState, filterDropdowns);
  filterDropdowns.addToDOM();
  filterDropdowns.updateInnerElements(searchState);
  eventManager.filterDropdowns_initToggles();
  eventManager.filterDropdowns_onClickAddAvailableToSelected();
  eventManager.filterDropdowns_onClickRemoveItemToSelected();
  eventManager.filterDropdowns_filterAvailableAccordingToInput();
}

window.addEventListener("DOMContentLoaded", initPage);
