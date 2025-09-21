import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrderSummary from './OrderSummary.jsx';
import { OrderManager } from '../../utils/OrderManager.js';

function Order() {
  // Get the order from localStorage on initial render
  const initialOrder = OrderManager.getOrderFromLocalStorage();
  const [order, setOrder] = useState(initialOrder);
  

  useEffect(() => {
    // Check if the retrieved order is empty
    if (initialOrder.products.length === 0) {
      // If it's empty, mock an order for demonstration purposes
      OrderManager.mockOrderToLocalStorage();
      // Update the component's state with the new mocked order
      setOrder(OrderManager.getOrderFromLocalStorage());
    }
  }, []); // The empty dependency array ensures this runs only once

  const handleRemoveProduct = (productIdOrSku) => {
    OrderManager.removeProductFromOrder(productIdOrSku);
    setOrder(OrderManager.getOrderFromLocalStorage());
  };

  const handleUpdateQuantity = (productIdOrSku, updatedFields) => {
    OrderManager.updateProductInOrder(productIdOrSku, updatedFields);
    setOrder(OrderManager.getOrderFromLocalStorage());
  };

  return (
    <div>
      <h2>Your Order</h2>
      {order.products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>
          No products in your order. Please add items to continue.
        </p>
      ) : (
        <OrderSummary
          items={order.products}
          onDelete={handleRemoveProduct}
          onQuantityChange={handleUpdateQuantity}
        />
      )}
    </div>
  );
}

export default Order;