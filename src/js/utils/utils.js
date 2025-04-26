/**
 * Capitalizes the first letter of a string and lowercases the rest.
 * @param {string} str - The input string.
 * @returns {string} The capitalized string.
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Normalizes a string by removing diacritics and converting to lowercase.
 * @param {string} str - The input string to normalize.
 * @returns {string} The normalized string.
 */
function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Normalizes all elements of a Set and returns a new Set.
 * @param {Set<string>} inputSet - A Set of strings to normalize.
 * @returns {Set<string>} A new Set with normalized strings.
 */
function normalizeSet(inputSet) {
  return new Set([...inputSet].map(normalize));
}

/**
 * Escapes special HTML characters in a string to prevent HTML injection.
 * @param {string} text - The input text to escape.
 * @returns {string} The escaped string.
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export { capitalize, normalize, normalizeSet, escapeHtml };
