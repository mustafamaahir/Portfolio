/**
 * API Service
 * Handles all communication with the FastAPI backend
 */

import axios from 'axios';

// Backend API URL - Update this with your deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-04he.onrender.com/';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    throw error;
  }
);

/**
 * Fetch all portfolio data
 */
export const fetchPortfolioData = async () => {
  try {
    const response = await api.get('/api/portfolio-data');
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
};

/**
 * Send a chat message to the AI assistant
 * @param {string} message - User's message
 * @param {Array} conversationHistory - Previous conversation messages
 */
export const sendChatMessage = async (message, conversationHistory = []) => {
  try {
    const response = await api.post('/api/chat', {
      message,
      conversation_history: conversationHistory,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    
    // Return user-friendly error message
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to send message. Please try again.');
    }
  }
};

/**
 * Get suggested questions for the chat
 */
export const getSuggestedQuestions = async () => {
  try {
    const response = await api.get('/api/suggested-questions');
    return response.data.questions;
  } catch (error) {
    console.error('Error fetching suggested questions:', error);
    // Return fallback questions
    return [
      "What projects have you built?",
      "Tell me about your experience",
      "What technologies do you use?",
    ];
  }
};

/**
 * Health check
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default api;