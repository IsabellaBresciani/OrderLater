import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const productService = {
  
  async getProductsByShop(shopId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/shops/${shopId}/products`);
      return response.data.products;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  },

  async getProductById(productId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
      return response.data.products;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  }
};

export default productService;