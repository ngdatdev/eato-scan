import { URI_PREFIX } from '@/constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_CONFIG = {
  BASE_URL: URI_PREFIX,
  MAPS_API: '/api/GoogleApi/maps',
  FOOD_RECOGNITION_API: '/api/FoodRecognition/analyze',
  AUTH: {
    LOGIN: '/api/login',
    REGISTER: '/api/register',
    CURRENT_USER: '/api/current-user'
  }
} as const;

// Helper function to create URL with query parameters
export const createUrl = (path: string, params?: Record<string, string | number | boolean>) => {
  const url = new URL(path, API_CONFIG.BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  return url.toString();
};

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth interceptor
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post(API_CONFIG.AUTH.LOGIN, { email, password });
    if (!response.data || !response.data.accessToken) {
      throw new Error('Invalid response from server: Missing accessToken');
    }
    return {
      token: response.data.accessToken,
      user: {
        id: response.data.id,
        fullName: response.data.userName,
        email: response.data.email
      }
    };
  },

  register: async (userData: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post(API_CONFIG.AUTH.REGISTER, userData);
    if (!response.data || !response.data.accessToken) {
      throw new Error('Invalid response from server: Missing accessToken');
    }
    return {
      token: response.data.accessToken,
      user: {
        id: response.data.id,
        fullName: response.data.userName,
        email: response.data.email
      }
    };
  },

  getCurrentUser: async () => {
    const response = await api.get(API_CONFIG.AUTH.CURRENT_USER);
    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
  },
};