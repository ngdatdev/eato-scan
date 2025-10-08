/**
 * API configuration
 */
export const API_CONFIG = {
  MAPS_API: 'http://192.168.1.150:5010/api/GoogleApi/maps',
  FOOD_RECOGNITION_API: 'http://192.168.1.150:5010/api/FoodRecognition/analyze',
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