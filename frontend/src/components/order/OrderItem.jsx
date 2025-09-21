import React from 'react';
import styled from 'styled-components';

// --- Styled Components ---

const OrderItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease-in-out;
  flex-wrap: wrap; // Allows items to wrap on smaller screens
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 1.5rem;
  border: 1px solid #ddd;
`;

const TextDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ItemName = styled.span`
  font-size: 1.15rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.2rem;
`;

const ItemSku = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
  font-style: italic;
`;

const ClarificationTextarea = styled.textarea`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 50px;
  color: #555;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1.5rem;
  min-width: 120px;
`;

const ItemTotalPrice = styled.span`
  font-size: 1.35rem;
  font-weight: bold;
  color: #030D59;
  margin-bottom: 0.2rem;
`;

const ItemUnitPrice = styled.span`
  font-size: 0.85rem;
  color: #9ca3af;
`;

const QuantityInput = styled.input`
  width: 55px;
  font-size: 1rem;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.5rem;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  margin-left: 1.5rem;
  transition: background 0.2s ease-in-out;
  
  &:hover {
    background: #c82333;
  }
`;

const OrderItem = ({ item, onDelete, onQuantityChange }) => {
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    onQuantityChange(item._id || item.id || item.sku, { quantity: newQuantity });
  };

  const handleClarificationChange = (e) => {
    const newClarification = e.target.value;
    onQuantityChange(item._id || item.id || item.sku, { clarification: newClarification });
  };
  
  const totalItemPrice = item.price * item.quantity;
  const imageUrl = item.image_url || 'https://via.placeholder.com/60';

  return (
    <OrderItemWrapper>
      <ProductInfo>
        <TextDetails>
          <ItemName>{item.name}</ItemName>
          <ItemSku>SKU: {item.sku}</ItemSku>
          <ClarificationTextarea
            value={item.clarification || ''}
            onChange={handleClarificationChange}
            placeholder="Add a note or special request here..."
          />
        </TextDetails>
      </ProductInfo>

      <QuantityInput
        type="number"
        min={1}
        value={item.quantity}
        onChange={handleQuantityChange}
      />
      
      <PriceSection>
        <ItemTotalPrice>${totalItemPrice.toFixed(2)}</ItemTotalPrice>
        <ItemUnitPrice>(${item.price.toFixed(2)} each)</ItemUnitPrice>
      </PriceSection>
      
      <DeleteButton onClick={() => onDelete(item._id || item.id || item.sku)}>
        Eliminar
      </DeleteButton>
    </OrderItemWrapper>
  );
};

export default OrderItem;