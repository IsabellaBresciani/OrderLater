import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button.jsx'; // Make sure the path is correct
import OrderForm from '../../components/order/OrderForm.jsx';
import { useParams } from 'react-router-dom';

// Styled components for the layout
const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f7f7f7;
  padding: 20px;
`;

const CheckoutContent = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;


function OrderCheckout() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); 
    };
    const { shopId } = useParams();

    return (

            <OrderForm  shopId={shopId}/>

    );
}

export default OrderCheckout;