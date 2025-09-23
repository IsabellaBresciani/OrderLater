import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrderSummary from './OrderSummary.jsx';
import { OrderManager } from '../../utils/OrderManager.js';
import Button from '../Button.jsx';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext.jsx';
import { useContext } from 'react';

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; // This ensures the container takes up the full viewport height
`;

const Header = styled.header`
  padding: 20px;
  background-color: white;
  z-index: 10;
`;

const ScrollableContent = styled.main`
  flex: 1; // Allows this section to grow and take up remaining space
  overflow-y: auto; // Enables vertical scrolling for content
  padding: 0 20px;
`;

const StaticFooter = styled.footer`
  padding: 20px;
  background-color: white; 
  border-top: 1px solid #ddd;
  text-align: center;
  z-index: 10;
`;

function Order() {
  const [order, setOrder] = useState(OrderManager.getOrderFromLocalStorage());
  const navigate = useNavigate(); 
  const { shopId: shopIdFromParams } = useParams();
  const shopContext = useContext(ShopContext);
  const shopId = shopContext?.shopId || shopIdFromParams;

  const handleRemoveProduct = (productIdOrSku) => {
    OrderManager.removeProductFromOrder(productIdOrSku);
    setOrder(OrderManager.getOrderFromLocalStorage());
  };

  const handleUpdateQuantity = (productIdOrSku, updatedFields) => {
    OrderManager.updateProductInOrder(productIdOrSku, updatedFields);
    setOrder(OrderManager.getOrderFromLocalStorage());
  };

  const handleContinue = () => {
    const targetShopId = shopId || order.shop_id;
    if (!targetShopId) {
      console.error('No shopId available for checkout', { shopId, order });
      return;
    }
    navigate(`/shops/${targetShopId}/order-checkout`);
  };

  return (
    <OrderContainer>
      <Header>
        <h2>Your Order</h2>
      </Header>
      
      <ScrollableContent>
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
      </ScrollableContent>
      
      <StaticFooter>
        <Button 
          onClick={handleContinue} 
          variant="primary" 
          disabled={order.products.length === 0}
        >
          Continue to Checkout
        </Button>
      </StaticFooter>
    </OrderContainer>
  );
}

export default Order;