function createFilterTag(value) {
  const tag = document.createElement("div");
  tag.className =
    "flex items-center justify-between bg-[#FFD15B] text-black text-[14px] px-[16px] rounded-[10px] min-w-[203px] h-[53px]";
  tag.setAttribute("data-value", value);

  tag.innerHTML = `
    <span class="mr-[8px]">${value}</span>
    <button
      type="button"
      aria-label="Retirer le filtre"
      class="group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="h-5 w-5 stroke-[1.5] group-hover:stroke-[2.5] text-[#7A7A7A] group-hover:text-black transition-all"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  `;

  return tag;
}

export { createFilterTag };
