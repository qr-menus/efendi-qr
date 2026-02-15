/**
 * Asset version for cache busting
 * Update this number when you change images or data
 * Users will see new content immediately on next visit
 */
export const ASSET_VERSION = "1.0";

/**
 * Generate image URL with cache busting query parameter
 * @param {string} category - Product category (e.g., 'kebab', 'pizza')
 * @param {string} id - Product id (e.g., 'kebab_1')
 * @returns {string} - Image URL with version parameter
 */
export const getImageUrl = (category, id) => {
  return `/images/${category}/${id}.webp?v=${ASSET_VERSION}`;
};
