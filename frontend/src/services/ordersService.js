import api from './baseURL';

const createOrder = (productId, quantity, note) => {
  return api.post('/orders', {
    productId,
    quantity,
    note,
  });
};

export default {
  createOrder,
};