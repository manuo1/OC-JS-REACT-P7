function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeSet(inputSet) {
  return new Set([...inputSet].map(normalize));
}

export { capitalize, normalize, normalizeSet };
