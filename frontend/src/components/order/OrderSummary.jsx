import React from 'react';
import OrderItemReduced from './OrderItemReduced.jsx';
import OrderItem from './OrderItem.jsx'; 

function OrderSummary({ items, onDelete, onQuantityChange, isReduced = true }) {
  // Determine which component to render based on the isReduced prop
  const OrderItemComponent = isReduced ? OrderItemReduced : OrderItem;

  return (
    <div style={{ width: '100%', marginBottom: '1rem' }}>
      {items.map(item => (
        <OrderItemComponent
          key={item._id || item.id || item.sku}
          item={item}
          onDelete={onDelete}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
}

export default OrderSummary;