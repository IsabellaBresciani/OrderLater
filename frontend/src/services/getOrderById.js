import axios from "axios";
import baseURL from "./baseURL.js";

const getOrderById = async (orderId, token) => {
  try {
    const response = await axios.get(`${baseURL()}/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data?.order || response.data?.order;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export default getOrderById;
