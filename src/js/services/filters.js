/**
 * Adds items to a dropdown container based on a set of labels.
 * @param {Set<string>} labelSet - Set of labels to add.
 * @param {Object} filterType - Filter type object containing a key.
 * @param {string} section - Section identifier for the dropdown.
 * @param {Function} itemFactory - Function that creates a DOM element from a label.
 */
function dropdowns_addItems(labelSet, filterType, section, itemFactory) {
  const id = `${filterType.key}-${section}`;
  const container = document.getElementById(id);
  if (!container) {
    console.error(`${id} does not exist`);
    return;
  }

  labelSet.forEach((label) => {
    container.appendChild(itemFactory(label));
  });
}

export { dropdowns_addItems };
