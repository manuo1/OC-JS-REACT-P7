import { ingredientListFactory } from "./ingredientListFactory.js";

/**
 * Creates an HTML card for a recipe based on the provided recipe data.
 * @param {Object} recipe - The recipe object containing the name, image, time, description, and ingredients.
 * @returns {string} - The HTML markup for the recipe card.
 */
export function recipeCardFactory(recipe) {
  return `
    <div class="bg-white rounded-[21px] overflow-hidden shadow min-h-[731px]">
      <div class="relative h-[253px] bg-white">
        <img
          src="/src/assets/images/recipes_min/${recipe.image}"
          alt="${recipe.name}"
          class="h-full w-full object-cover"
        />
        <div class="absolute flex items-center top-5.5 right-6 rounded-full bg-[#FFD15B]">
          <span class="recipe-tag px-3.5 py-1 text-[#1B1B1B] text-[12px]">${recipe.time}min</span>
        </div>
      </div>
      <div class="p-[23px] pt-[30px]">
        <h2 class="font-[Anton] text-black text-[18px] mb-2">${recipe.name}</h2>
        <div class="mt-[30px]">
          <h3 class="uppercase text-[12px] text-[#7A7A7A] tracking-[9%] font-[700]">RECETTE</h3>
          <p class="text-[#1B1B1B] text-[14px] mt-[13px] h-[76px] leading-[19px] line-clamp-4 overflow-hidden">
            ${recipe.description}
          </p>
        </div>
        <div class="mt-[30px]">
          <h3 class="uppercase text-[12px] text-[#7A7A7A] tracking-[9%] font-[700]">INGRÉDIENTS</h3>
          <div class="grid grid-cols-2 gap-x-[23px] gap-y-[17px] mt-[15px]">
            ${ingredientListFactory(recipe.ingredients)}
          </div>
        </div>
      </div>
    </div>
  `;
}
