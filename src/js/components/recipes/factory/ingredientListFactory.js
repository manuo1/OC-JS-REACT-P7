/**
 * Generates the HTML markup for a list of ingredients.
 * Each ingredient includes its name, quantity, and unit.
 *
 * @param {Array} ingredients - An array of ingredient objects, each with:
 *    - ingredient {string} - The name of the ingredient.
 *    - quantity {string|number} - The quantity of the ingredient.
 *    - unit {string} - The unit of measurement for the ingredient.
 * @returns {string} - The HTML string representing the list of ingredients.
 */

function ingredientListFactory(ingredients) {
  return ingredients
    .map(({ ingredient, quantity, unit }) => {
      return `
          <div>
            <p class="text-[14px] font-[500]">${ingredient}</p>
            <p class="text-[14px] font-[500] text-[#7A7A7A]">
              ${quantity ?? ""} ${unit ?? ""}
            </p>
          </div>
        `;
    })
    .join("");
}

export { ingredientListFactory };
