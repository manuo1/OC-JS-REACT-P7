// Code Block 1
// Boucles natives

for (let k = 0; k < searchTerms.length; k++) {
  refreshRecipesByMainSearchV1(searchTerms[k], recipeList);
}

// Code Block 2
// Programmation fonctionnelle

for (let k = 0; k < searchTerms.length; k++) {
  refreshRecipesByMainSearchV2(searchTerms[k], recipeList);
}
