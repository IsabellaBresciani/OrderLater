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


export const approveOrder = async (orderId, token) => {
  const response = await axios.patch(
    `${baseURL()}/api/orders/approve/${orderId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};


export const rejectOrder = async (orderId, token) => {
  const response = await axios.patch(
    `${baseURL()}/api/orders/reject/${orderId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
