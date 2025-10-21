import axios from "axios";
import baseURL from "./baseURL.js";

const getUserOrders = async (userId, token) => {
  try {
    const response = await axios.get(`${baseURL()}/api/orders/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.ordersWithActions; 
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

export default getUserOrders;
