const API_URL = import.meta.env.VITE_API_URL || 'https://gilani-s-backend.up.railway.app';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  }

  // Auth
  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async getProfile() {
    return this.request('/api/auth/me');
  }

  async logout() {
    this.setToken(null);
  }

  // Generic methods for CRUD operations
  async get(endpoint) {
    return this.request(endpoint);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Menu
  async getMenu() {
    return this.request('/api/menu');
  }

  // Orders
  async createOrder(orderData) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders() {
    return this.request('/api/orders');
  }

  // Loyalty
  async getLoyaltyConfig() {
    return this.request('/api/loyalty/config');
  }

  async getUserLoyalty(userId) {
    return this.request(`/api/loyalty/user/${userId}`);
  }

  async addPoints(userId, points, reason) {
    return this.request(`/api/loyalty/user/${userId}/add`, {
      method: 'POST',
      body: JSON.stringify({ points, reason }),
    });
  }

  async redeemReward(userId, rewardId) {
    return this.request(`/api/loyalty/user/${userId}/redeem`, {
      method: 'POST',
      body: JSON.stringify({ rewardId }),
    });
  }
}

export const api = new ApiService();
