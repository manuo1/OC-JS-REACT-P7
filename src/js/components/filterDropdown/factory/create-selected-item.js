/**
 * Creates an <li> element representing a selected dropdown option.
 * Includes a remove button to allow the user to unselect the item.
 *
 * @param {string} value - The selected value to display (e.g., "Tomato").
 * @returns {HTMLLIElement} - The fully constructed <li> element with remove button.
 */
function createSelectedItem(value) {
  const li = document.createElement("li");
  li.className =
    "group flex items-center justify-between w-full bg-[#FFD15B] text-[#1B1B1B] my-[1px] px-[16px] py-[6px]";
  li.setAttribute("data-value", value);

  li.innerHTML = `
      <span class="transition group-hover:font-bold">${value}</span>
      <button
        type="button"
        aria-label="Retirer l'ingrédient"
        class="text-[#1B1B1B] opacity-0 group-hover:opacity-100 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    `;

  return li;
}

export { createSelectedItem };
