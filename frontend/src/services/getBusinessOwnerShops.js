import axios from "axios";
import baseURL from "./baseURL.js";

const getShopOrders = async (user_id, token) => {
  try {
    const response = await axios.get(`${baseURL()}/api/shops/users/${user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching shop orders:", error);
    throw error;
  }
};

export default getShopOrders;
