import axios from 'axios';
import baseURL from './baseURL';

const shopService = {
  async getAllShops(authToken) {
    try {
      const response = await axios.get(`${baseURL()}/api/shops`, {
      headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data.shops;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  },

  async getShopById(shopId, authToken) {
    try {
      const response = await axios.get(`${baseURL()}/api/shops/${shopId}`, {
      headers: { Authorization: `Bearer ${token, authToken}` },
      });
      return response.data.shops;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  },

  async getShopsByOwner(user_id, token) {
    try {
  
      const response = await axios.get(`${baseURL()}/api/shops/users/${user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
      });
    
      return response.data.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  }
};

export default shopService;
