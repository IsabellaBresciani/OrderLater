const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

const OrderManager = {
  createOrderInLocalStorage(shopId = '') {
    localStorage.setItem(
      'currentOrder',
      JSON.stringify({
        user_id: currentUser?._id || '',
        shop_id: shopId,
        products: [],
      })
    );
  },

  getOrderFromLocalStorage() {
    const stored = localStorage.getItem('currentOrder');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { user_id: currentUser?._id || '', shop_id: '', products: [] };
      }
    }
    return { user_id: currentUser?._id || '', shop_id: '', products: [] };
  },

  saveOrderToLocalStorage(order) {
    localStorage.setItem('currentOrder', JSON.stringify(order));
  },

  _manageOrder(modificationCallback) {
    const currentOrder = this.getOrderFromLocalStorage();
    const newOrder = modificationCallback(currentOrder);
    this.saveOrderToLocalStorage(newOrder);
    return newOrder;
  },

  addProductToOrder(product, shopId) {
    return this._manageOrder((order) => {
      if (!order.shop_id && shopId) {
        order.shop_id = shopId; 
      }

      const incomingId = product._id || product.id || null;
      const incomingSku = product.sku || null;

      order.products = order.products.filter((p) => {
        const pid = p._id || p.id || p.sku;
        const incomingKey = incomingId || incomingSku;
        return pid !== incomingKey;
      });

      const newProduct = {
        _id: incomingId || null,
        id: incomingId || null,
        sku: product.sku || null,
        name: product.name || '',
        price: product.price ?? product.unit_price ?? 0,
        quantity: Number(product.quantity) || 1,
        clarification: product.clarification ?? '',
      };

      if (product.advance_in_days !== undefined)
        newProduct.advance_in_days = product.advance_in_days;
      if (product.discount !== undefined)
        newProduct.discount = product.discount;

      order.products.push(newProduct);
      return order;
    });
  },

  updateProductInOrder(productIdOrSku, updatedFields) {
    return this._manageOrder((order) => {
      order.products = order.products.map((p) => {
        const key = p._id || p.id || p.sku;
        if (key === productIdOrSku) {
          return { ...p, ...updatedFields };
        }
        return p;
      });
      return order;
    });
  },

  removeProductFromOrder(productIdOrSku) {
    return this._manageOrder((order) => {
      order.products = order.products.filter(
        (p) => (p._id || p.id || p.sku) !== productIdOrSku
      );
      return order;
    });
  },

  clearOrder() {
    localStorage.removeItem('currentOrder');
  },
};

export { OrderManager };
