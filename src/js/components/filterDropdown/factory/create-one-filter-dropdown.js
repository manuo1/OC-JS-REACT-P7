/**
 * Creates a dropdown menu element based on the provided filter type.
 * The dropdown includes a toggle button, a search bar, a section for selected items,
 * and a section for available items.
 *
 * @param {Object} filterTypes - An object representing the filter type, containing:
 *   @param {string} filterTypes.key - A unique key used to identify the dropdown and its elements.
 *   @param {string} filterTypes.label - The label displayed on the dropdown button.
 * @returns {HTMLElement} - A DOM element representing the complete dropdown menu.
 */
function createFilterDropdown(filterTypes) {
  const { key = null, label = null } = filterTypes;
  const container = document.createElement("div");
  container.className = "min-w-[200px] max-w-[195px]";
  container.id = key + "-filter";

  container.innerHTML = `
      <!-- Zone A : Toggle button -->
      <button
        type="button"
        id="${key}-filter-button"
        class="w-full flex justify-between items-center h-[56px] px-[16px] gap-[58px] font-[500] bg-white rounded-t-[11px] rounded-b-[11px] shadow"
        aria-expanded="false"
      >
        <span>${label}</span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
  
      <!-- Zone B : hidable section -->
      <div id="${key}-dropdown-wrapper" class="hidden">
        <!-- Zone 1 : Search bar -->
        <div class="w-full bg-white px-[16px]">
          <div class="flex items-center border border-[#C6C6C6] pl-[12px] pr-[10px] h-[36px]">
            <input type="text" class="flex-1 min-w-0 bg-transparent focus:outline-none text-[#7A7A7A]" />
            <button type="button" aria-label="Effacer la recherche" class="pr-[5px] group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-3.5 w-3.5 stroke-[1.5] group-hover:stroke-[2.5] text-[#7A7A7A] group-hover:text-black transition-all" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 text-[#7A7A7A]">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
        </div>
  
        <!-- Zone 2 : List of Selected Items -->
        <div class="flex bg-white pt-[15px]">
          <ul id="selected-items-section" class="flex flex-col w-full"></ul>
        </div>
  
        <!-- Zone 3 : List of available items -->
        <div class="dropdown-options flex bg-white pt-[15px] rounded-b-[11px] overflow-hidden">
          <ul id="available-items-section" class="options-list flex flex-col w-full"></ul>
        </div>
      </div>
    `;

  return container;
}

export { createFilterDropdown };
