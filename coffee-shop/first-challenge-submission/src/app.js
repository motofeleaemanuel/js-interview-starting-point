import { API_BASE_URL } from "./config.js";
import { apiFetch } from "./interceptor.js";

const COFFEE_SHOPS_API_URL = `${API_BASE_URL}/coffee_shops`
const NEAREST_SHOPS_COUNT = 3;

export function calculateEuclideanDistance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1)
}

/**
 * @param {Object} position
 * @param {number} position.x
 * @param {number} position.y 
 * @returns {Promise<Array<{name: string, distance: number}>>}
 * @throws {Error}
 */

export async function getNearestShops(position) {
  const response = await apiFetch(COFFEE_SHOPS_API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch coffee shops status ${response.status}`);
  }

  const shops = await response.json();

  return shops
    .map(shop => ({
      name: shop.name,
      distance: calculateEuclideanDistance(
        parseFloat(position.x),
        parseFloat(position.y),
        parseFloat(shop.x),
        parseFloat(shop.y),
      ),
    }))
    .toSorted((a, b) => a.distance - b.distance)
    .slice(0, NEAREST_SHOPS_COUNT)
    .map(shop => ({
      name: shop.name,
      distance: parseFloat(shop.distance.toFixed(4)),
    }));
}
