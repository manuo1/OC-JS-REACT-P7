import { escapeHtml } from "../../../utils/utils.js";

/**
 * Generates the HTML markup for a "no recipes found" message.
 * This is displayed when no recipe matches the main search text.
 *
 * @param {string} mainSearchText - The text entered by the user in the search bar.
 * @returns {string} - The HTML string for the "no recipes" message.
 */
function noRecipeFactory(mainSearchText) {
  return `
   
    <div class="col-span-full  flex flex-col justify-start items-center text-[#1B1B1B] bg-[#FFD15B] rounded-[21px] shadow p-8">
      <p class="text-lg font-semibold mb-2 text-center">
        Aucune recette ne contient « <span class="font-bold">${escapeHtml(mainSearchText)}</span> ».
      </p>
      <p class="text-sm text-[#7A7A7A] text-center">
        Essayez avec des mots-clés comme « tarte aux pommes », « poisson », etc.
      </p>
    </div>
  `;
}

export { noRecipeFactory };
