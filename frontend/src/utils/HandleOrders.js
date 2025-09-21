function getOrderFromLocalStorage() {
  const stored = localStorage.getItem('currentOrder');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { user_id: '', commerce_id: '', products: [] };
    }
  }
  return { user_id: '', commerce_id: '', products: [] };
}

function saveOrderToLocalStorage(order) {
  localStorage.setItem('currentOrder', JSON.stringify(order));
}

function addProductToOrder(product) {
  const order = getOrderFromLocalStorage();
  order.products.push(product);
  saveOrderToLocalStorage(order);
  return order;
}

function removeProductFromOrder(productIdOrSku) {
  const order = getOrderFromLocalStorage();
  order.products = order.products.filter(
    p => (p._id || p.id || p.sku) !== productIdOrSku
  );
  saveOrderToLocalStorage(order);
  return order;
}

function clearOrderFromLocalStorage() {
  localStorage.removeItem('currentOrder');
}

export {
  getOrderFromLocalStorage,
  saveOrderToLocalStorage,
  addProductToOrder,
  removeProductFromOrder,
  clearOrderFromLocalStorage
};