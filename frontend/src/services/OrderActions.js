import axios from "axios";
import baseURL from "./baseURL.js";

export const payOrder = async (orderId, token) => {
  const response = await axios.patch(
    `${baseURL()}/api/orders/pay/${orderId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};


export const cancelOrder = async (orderId, token) => {
  const response = await axios.patch(
    `${baseURL()}/api/orders/cancel/${orderId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
