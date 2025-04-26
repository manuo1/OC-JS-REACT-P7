/**
 * Creates a list item (li) for an available item in the filter dropdown.
 *
 * @param {string} value - The value to be displayed for the available item.
 * @returns {HTMLElement} - The HTML list item (li) element representing the available item.
 */
function createAvailableItem(value) {
  const li = document.createElement("li");
  li.className = "group flex items-center justify-between w-full hover:bg-[#FFD15B] text-[#1B1B1B] px-[16px] py-[6px]";
  li.setAttribute("data-value", value);

  li.innerHTML = `
      <span class="transition group-hover:font-bold">${value}</span>
    `;

  return li;
}

export { createAvailableItem };
