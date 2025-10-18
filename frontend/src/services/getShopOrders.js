import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const getShopOrders = async (shopId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/shops/${shopId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching shop orders:", error);
    throw error;
  }
};

export default getShopOrders;
