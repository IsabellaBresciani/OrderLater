import axios from 'axios';
import baseURL from './baseURL';

const shopService = {
  async getAllShops() {
    try {
      const response = await axios.get(`${baseURL()}/api/shops`);
      return response.data.shops;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  },

  async getShopById(shopId) {
    try {
      const response = await axios.get(`${baseURL()}/api/shops/${shopId}`);
      return response.data.shops;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  }
};

export default shopService;
