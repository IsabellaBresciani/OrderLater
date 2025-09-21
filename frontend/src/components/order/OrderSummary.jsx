import React from 'react';
import OrderItem from './OrderItem.jsx';

function OrderSummary({ items, onDelete, onQuantityChange }) {
  return (
    <table style={{ width: '100%', marginBottom: '1rem' }}>
      <tbody>
        {items.map(item => (
          <OrderItem
            key={item._id || item.id || item.sku}
            item={item}
            onDelete={onDelete}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </tbody>
    </table>
  );
}

export default OrderSummary;