// API Helper Utility for Frontend
// Simplifies API calls with error handling and token management

class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL || 'http://localhost:5000';
    this.timeout = 10000;
    this.tokenKey = 'krishiai_token';
  }

  // Get stored token
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Save token
  setToken(token) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  // Get auth headers
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Make API request
  async request(method, endpoint, data = null, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const needsAuth = options.requiresAuth !== false;

    const requestOptions = {
      method,
      headers: this.getHeaders(needsAuth),
      ...options,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      requestOptions.body = JSON.stringify(data);
    }

    try {
      const response = await Promise.race([
        fetch(url, requestOptions),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), this.timeout)
        ),
      ]);

      const result = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: result.message || 'API Error',
          errors: result.errors || [],
        };
      }

      return result;
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, options = {}) {
    return this.request('GET', endpoint, null, options);
  }

  // POST request
  async post(endpoint, data, options = {}) {
    return this.request('POST', endpoint, data, options);
  }

  // PUT request
  async put(endpoint, data, options = {}) {
    return this.request('PUT', endpoint, data, options);
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, null, options);
  }

  // Auth Methods
  async sendOTP(phoneNumber) {
    return this.post('/api/auth/send-otp', { phoneNumber }, { requiresAuth: false });
  }

  async verifyOTP(phoneNumber, otp) {
    const result = await this.post('/api/auth/verify-otp', { phoneNumber, otp }, { requiresAuth: false });
    if (result.token) {
      this.setToken(result.token);
    }
    return result;
  }

  async register(userData) {
    return this.post('/api/auth/register', userData, { requiresAuth: false });
  }

  async login(phoneNumber, password) {
    const result = await this.post('/api/auth/login', { phoneNumber, password }, { requiresAuth: false });
    if (result.token) {
      this.setToken(result.token);
    }
    return result;
  }

  async logout() {
    this.setToken(null);
    return this.post('/api/auth/logout', {});
  }

  // Query Methods
  async submitQuery(queryData) {
    return this.post('/api/queries', queryData);
  }

  async getMyQueries(status = null) {
    const endpoint = status ? `/api/queries/my-queries?status=${status}` : '/api/queries/my-queries';
    return this.get(endpoint);
  }

  async getQueryById(queryId) {
    return this.get(`/api/queries/${queryId}`);
  }

  async rateQuery(queryId, rating, feedback = '') {
    return this.put(`/api/queries/${queryId}/rate`, { rating, feedback });
  }

  // Marketplace Methods
  async getProducts(filters = {}) {
    let endpoint = '/api/marketplace';
    const params = new URLSearchParams(filters).toString();
    if (params) {
      endpoint += `?${params}`;
    }
    return this.get(endpoint, { requiresAuth: false });
  }

  async getProductById(productId) {
    return this.get(`/api/marketplace/${productId}`, { requiresAuth: false });
  }

  async createProduct(productData) {
    return this.post('/api/marketplace', productData);
  }

  async updateProduct(productId, productData) {
    return this.put(`/api/marketplace/${productId}`, productData);
  }

  async deleteProduct(productId) {
    return this.delete(`/api/marketplace/${productId}`);
  }

  async getMyProducts() {
    return this.get('/api/marketplace/seller/my-products');
  }

  // Profile Methods
  async getProfile() {
    return this.get('/api/profile/profile');
  }

  async updateProfile(profileData) {
    return this.put('/api/profile/profile', profileData);
  }

  async getNotificationPreferences() {
    return this.get('/api/profile/preferences');
  }

  async updateNotificationPreferences(prefs) {
    return this.put('/api/profile/preferences', prefs);
  }

  async getNotifications() {
    return this.get('/api/profile/notifications');
  }

  async markNotificationAsRead(notificationId) {
    return this.put(`/api/profile/notifications/${notificationId}/read`, {});
  }

  // Alert Methods
  async getAlerts(filters = {}) {
    let endpoint = '/api/alerts';
    const params = new URLSearchParams(filters).toString();
    if (params) {
      endpoint += `?${params}`;
    }
    return this.get(endpoint, { requiresAuth: false });
  }

  async getAlertById(alertId) {
    return this.get(`/api/alerts/${alertId}`, { requiresAuth: false });
  }

  // Feedback Methods
  async submitFeedback(feedbackData) {
    return this.post('/api/feedback', feedbackData);
  }

  async getMyFeedback() {
    return this.get('/api/feedback/my-feedback');
  }
}

// Create global instance
if (typeof window !== 'undefined') {
  window.apiClient = new APIClient(window.API_CONFIG?.BASE_URL || 'http://localhost:5000');
}

// Export for Node.js/Webpack
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APIClient;
}
