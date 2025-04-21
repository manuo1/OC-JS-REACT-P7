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
