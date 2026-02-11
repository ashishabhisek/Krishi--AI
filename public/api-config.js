// API Configuration for Frontend
// Update these values based on your deployment environment

const API_CONFIG = {
  // API Base URL
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',

  // API Endpoints
  ENDPOINTS: {
    // Auth
    AUTH: {
      SEND_OTP: '/api/auth/send-otp',
      VERIFY_OTP: '/api/auth/verify-otp',
      REGISTER: '/api/auth/register',
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
    },

    // Queries
    QUERIES: {
      SUBMIT: '/api/queries',
      GET_MY_QUERIES: '/api/queries/my-queries',
      GET_BY_ID: '/api/queries/:queryId',
      RATE: '/api/queries/:queryId/rate',
      GET_ALL: '/api/queries',
      RESPOND: '/api/queries/:queryId/respond',
    },

    // Marketplace
    MARKETPLACE: {
      GET_ALL: '/api/marketplace',
      GET_BY_ID: '/api/marketplace/:productId',
      CREATE: '/api/marketplace',
      GET_MY_PRODUCTS: '/api/marketplace/seller/my-products',
      UPDATE: '/api/marketplace/:productId',
      DELETE: '/api/marketplace/:productId',
    },

    // Profile
    PROFILE: {
      GET: '/api/profile/profile',
      UPDATE: '/api/profile/profile',
      GET_PREFERENCES: '/api/profile/preferences',
      UPDATE_PREFERENCES: '/api/profile/preferences',
      GET_NOTIFICATIONS: '/api/profile/notifications',
      MARK_NOTIFICATION_READ: '/api/profile/notifications/:notificationId/read',
      SAVE_TIP: '/api/profile/saved-tips',
      GET_SAVED_TIPS: '/api/profile/saved-tips',
      DELETE_TIP: '/api/profile/saved-tips/:articleId',
    },

    // Alerts
    ALERTS: {
      GET_ALL: '/api/alerts',
      GET_BY_ID: '/api/alerts/:alertId',
      CREATE: '/api/alerts',
      UPDATE: '/api/alerts/:alertId',
      DELETE: '/api/alerts/:alertId',
    },

    // Feedback
    FEEDBACK: {
      SUBMIT: '/api/feedback',
      GET_MY_FEEDBACK: '/api/feedback/my-feedback',
      GET_ALL: '/api/feedback',
      RESPOND: '/api/feedback/:feedbackId/respond',
    },
  },

  // Timeout (in ms)
  TIMEOUT: 10000,

  // Retry Configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // ms
  },
};

// Helper function to build full URL
function getFullUrl(endpoint, params = {}) {
  let url = API_CONFIG.BASE_URL + endpoint;
  Object.keys(params).forEach((key) => {
    url = url.replace(`:${key}`, params[key]);
  });
  return url;
}

// Helper function to get API endpoint
function getEndpoint(category, action) {
  return API_CONFIG.ENDPOINTS[category]?.[action] || null;
}

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_CONFIG, getFullUrl, getEndpoint };
} else {
  // For browser usage
  window.API_CONFIG = API_CONFIG;
  window.getFullUrl = getFullUrl;
  window.getEndpoint = getEndpoint;
}
