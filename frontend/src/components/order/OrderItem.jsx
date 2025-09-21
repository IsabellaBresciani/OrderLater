import React from 'react';
import styled from 'styled-components';

// --- Styled Components ---
const OrderItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
`;

const Quantity = styled.input`
  width: 50px;
  font-size: 1rem;
  font-weight: bold;
  color: #6c757d;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-right: 1rem;
`;

const ItemName = styled.span`
  flex-grow: 1;
  font-size: 1.1rem;
  font-weight: 500;
  color: #343a40;
  margin: 0 1rem;
`;

const ItemPrice = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #030D59;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  margin-left: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #b71c1c;
  }
`;

const OrderItem = ({ item, onDelete,  onQuantityChange}) => {
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    onQuantityChange(item._id || item.id || item.sku, { quantity: newQuantity });
  };

  return (
    <OrderItemContainer>
      <Quantity
        type="number"
        min={1}
        value={item.quantity}
        onChange={handleQuantityChange}
      />
      <ItemName>{item.name}</ItemName>
      <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
      <DeleteButton onClick={() => onDelete(item._id || item.id || item.sku)}>
        Eliminar
      </DeleteButton>
    </OrderItemContainer>
  );
};

export default OrderItem;