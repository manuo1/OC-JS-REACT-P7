/**
 * Creates an <li> element representing an available dropdown option.
 * This element is used to display a selectable value within the dropdown menu.
 *
 * @param {string} value - The value to display (e.g., "Tomato").
 * @returns {HTMLLIElement} - A DOM element representing the dropdown option.
 */
function createAvailableItem(value) {
  const li = document.createElement("li");
  li.className =
    "group flex items-center justify-between w-full hover:bg-[#FFD15B] text-[#1B1B1B] my-[1px] px-[16px] py-[6px]";
  li.setAttribute("data-value", value);

  li.innerHTML = `
      <span class="transition group-hover:font-bold">${value}</span>
    `;

  return li;
}

export { createAvailableItem };

// const availableItem = createAvailableItem('Tomate');
// document.getElementById("available-items-section").appendChild(availableItem);
