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
