// src/services/getShopOrders.js
import axios from "axios";
import baseURL from "./baseURL.js";

const getShopOrders = async (shopId, token) => {
  try {
    const response = await axios.get(`${baseURL()}/api/orders/shops/${shopId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching shop orders:", error);
    throw error;
  }
};

export default getShopOrders;
