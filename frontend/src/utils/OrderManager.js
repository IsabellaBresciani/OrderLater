const OrderManager = {

  // Method to get the current order from localStorage
 getOrderFromLocalStorage() {
    const stored = localStorage.getItem('currentOrder');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { user_id: '', shop_id: '', products: [] };
      }
    }
    return { user_id: '', shop_id: '', products: [] };
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

  addProductToOrder(product) {
    return this._manageOrder(order => {
      if (!order.user_id && product.user_id) {
        order.user_id = product.user_id;
      }

      if (!order.shop_id && product.shop_id) {   
        order.shop_id = product.shop_id;
      }

      // identificador entrante (puede venir como _id o id)
      const incomingId = product._id || product.id || null;
      const incomingSku = product.sku || null;

      // eliminar duplicado por _id / id / sku
      order.products = order.products.filter(p => {
        const pid = p._id || p.id || p.sku;
        const incomingKey = incomingId || incomingSku;
        return pid !== incomingKey;
      });

      // construir objeto guardado (asegurar que tenga _id)
      const newProduct = {
        _id: incomingId || null,
        id: incomingId || null,
        sku: product.sku || null,
        name: product.name || '',
        price: product.price ?? product.unit_price ?? 0,
        quantity: Number(product.quantity) || 1,
        clarification: product.clarification ?? product.clarificatin ?? '',
      };

      if (product.advance_in_days !== undefined) newProduct.advance_in_days = product.advance_in_days;
      if (product.discount !== undefined) newProduct.discount = product.discount;

      order.products.push(newProduct);
      return order;
    });
  },

  removeProductFromOrder(productIdOrSku) {
    return this._manageOrder(order => {
      order.products = order.products.filter(
        p => (p._id || p.id || p.sku) !== productIdOrSku
      );
      return order;
    });
  },

  clearOrder() {
    return this._manageOrder(() => {
      return { user_id: '', shop_id: '', products: [] };
    });
  },

  updateProductInOrder(productIdOrSku, updatedFields) {
    return this._manageOrder(order => {
      order.products = order.products.map(product =>
        (product._id || product.id || product.sku) === productIdOrSku
          ? { ...product, ...updatedFields }
          : product
      );
      return order;
    });
  },

  mockOrderToLocalStorage() {
    return this._manageOrder(() => this.mockOrder);
  }
};

export { OrderManager };