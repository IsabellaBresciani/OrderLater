import axios from 'axios';
import baseURL from './baseURL'; 

const productService = {
  async getProductsByShop(shopId) {
    try {
      const response = await axios.get(`${baseURL()}/api/products`);
      return response.data.products.filter(p => p.shop === shopId);
    } catch (error) {
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  },

  async getProductById(productId) {
    try {
      const response = await axios.get(`${baseURL()}/api/products/${productId}`);
      return response.data.products;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  },

  async createProduct(productData, authToken) { 
    try {
      const response = await axios.post(`${baseURL()}/api/products`, productData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      throw error.response ?
      error.response.data : new Error('An unexpected error occurred');
    }
  }
};

export default productService;
