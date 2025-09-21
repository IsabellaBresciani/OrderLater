const OrderManager = {
  // Mock data for demonstration purposes
  mockOrder: {
    user_id: "68cf35355d0307a943206502",
    commerce_id: "68cf3f02a82f68b4e636457e",
    products: [
      {
        _id: "68cf5855dd378731e5b7dd77",
        sku: "PAN001",
        name: "Pan Francés",
        price: 250,
        quantity: 2,
      },
      {
        _id: "68cf597ea88c72c0acceefeb",
        sku: "FACT001",
        name: "Factura de Dulce de Leche",
        price: 150,
        quantity: 3,
      },
      {
        _id: "68cf598ba88c72c0acceefee",
        sku: "MED001",
        name: "Medialuna",
        price: 120,
        quantity: 5,
      },
    ],
  },

  // Method to get the current order from localStorage
  getOrderFromLocalStorage() {
    const stored = localStorage.getItem('currentOrder');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { user_id: '', commerce_id: '', products: [] };
      }
    }
    return { user_id: '', commerce_id: '', products: [] };
  },

  // Method to save an order to localStorage
  saveOrderToLocalStorage(order) {
    localStorage.setItem('currentOrder', JSON.stringify(order));
  },

  /**
   * Template Method: Defines the skeleton for all order modification operations.
   * It ensures that every operation retrieves the current order, applies a specific
   * modification, and then saves the result back to localStorage.
   * @param {function(object): object} modificationCallback - A function that takes the current order and returns the modified order.
   * @returns {object} The newly saved order.
   */
  _manageOrder(modificationCallback) {
    const currentOrder = this.getOrderFromLocalStorage();
    const newOrder = modificationCallback(currentOrder);
    this.saveOrderToLocalStorage(newOrder);
    return newOrder;
  },

  // Method to add a product to the order
  addProductToOrder(product) {
    return this._manageOrder(order => {
      order.products.push(product);
      return order;
    });
  },

  // Method to remove a product from the order
  removeProductFromOrder(productIdOrSku) {
    return this._manageOrder(order => {
      order.products = order.products.filter(
        p => (p._id || p.id || p.sku) !== productIdOrSku
      );
      return order;
    });
  },

  // Method to clear the order by saving an empty order object
  clearOrder() {
    return this._manageOrder(() => {
      return { user_id: '', commerce_id: '', products: [] };
    });
  },

  // Method to update a product in the order
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
  
  // Method to mock an order and save it to localStorage for testing
  mockOrderToLocalStorage() {
    return this._manageOrder(() => this.mockOrder);
  }
};

export { OrderManager };