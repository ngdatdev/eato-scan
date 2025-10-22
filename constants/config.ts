/**
 * API configuration
 */
export const URI_PREFIX = 'http://192.168.1.150:5010';

export const API_CONFIG = {
  MAPS_API: `${URI_PREFIX}/api/GoogleApi/maps`,
  FOOD_RECOGNITION_API: `${URI_PREFIX}/api/FoodRecognition/analyze`,
} as const;

/**
 * Create URL with query parameters
 */
export const createUrl = (baseUrl: string, params: Record<string, string | number | boolean>) => {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  return url.toString();
};