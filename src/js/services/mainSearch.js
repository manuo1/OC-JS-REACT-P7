function refreshRecipesByMainSearch(searchText, recipeList) {
  if (searchText === "" || searchText.length < 3) {
    return recipeList;
  } else {
    // search algo soon :)
    //return recipeList.slice(5, 15);
    return [];
  }
}
export { refreshRecipesByMainSearch };
