import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create();

// Configure base URL based on environment
const isDevelopment = import.meta.env.DEV;

if (isDevelopment) {
  // In development, use the proxy (no base URL needed)
  // The proxy in vite.config.js will handle /api routes
  console.log('🔧 Development mode: Using Vite proxy for API calls');
} else {
  // In production, use the deployed backend URL
  api.defaults.baseURL = 'https://agrova-backend-2.onrender.com';
  console.log('🚀 Production mode: Using deployed backend at', api.defaults.baseURL);
}

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    if (isDevelopment) {
      console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    if (isDevelopment) {
      console.log('📥 API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data
    });
    
    // Provide user-friendly error messages
    if (error.response?.status === 404) {
      error.userMessage = 'API endpoint not found. Please check the backend deployment.';
    } else if (error.response?.status === 500) {
      error.userMessage = 'Server error. Please try again later.';
    } else if (!error.response) {
      error.userMessage = 'Network error. Please check your internet connection.';
    } else {
      error.userMessage = 'An unexpected error occurred. Please try again.';
    }
    
    return Promise.reject(error);
  }
);

export default api; 