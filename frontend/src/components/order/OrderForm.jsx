import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button.jsx';
import OrderSummary from './OrderSummary.jsx';
import TotalsDisplay from './TotalsDisplay.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OrderManager } from '../../utils/OrderManager.js';
import orderCreate from '../../services/orderCreate.js';


export const FormContainer = styled.form`
  background: #f9fafb; /* Lighter, more modern background */
  padding: 2.5rem 3rem; /* More generous padding */
  border-radius: 16px; /* Slightly larger border-radius */
  box-shadow: 0 4px 20px rgba(0,0,0,0.05); /* Softer shadow */
  max-width: 80%; /* Wider for better content display */
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  border: 1px solid #e5e7eb; /* Subtle border */
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  label {
    font-weight: 500;
    margin-bottom: 0.2rem;
    color: #1f2937;
  }
`;

export const Header = styled.div`
  text-align: center;
  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
  p {
    color: #6b7280;
    font-size: 1rem;
    margin: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

function OrderForm() {
  const [order, setOrder] = useState(OrderManager.getOrderFromLocalStorage());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [calculatedItems, setCalculatedItems] = useState([]);
  const [orderTotals, setOrderTotals] = useState({ subtotal: 0, discount: 0, total: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to manage form submission status

  useEffect(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    const today = new Date();
    const diffTime = deliveryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log('Days until delivery:', diffDays);
    const itemsWithCalculations = order.products.map(item => {
      let itemDiscount = 0;
      console.log(`Evaluating item ${item.name} for discount...`);
      // You should add 'advance_in_days' to your product schema to use this discount logic
      if (item.advance_in_days && diffDays >= item.advance_in_days) {
        // Assuming discount is a percentage
        console.log(`Applying discount for item ${item.name}: ${item.discount}%`);
        itemDiscount = (item.price * item.quantity) * (item.discount / 100);
      }
      subtotal += (item.price ?? 0) * item.quantity;
      totalDiscount += itemDiscount;
      return { ...item, appliedDiscount: itemDiscount };
    });

    setCalculatedItems(itemsWithCalculations);
    setOrderTotals({
      subtotal,
      discount: totalDiscount,
      total: subtotal - totalDiscount,
    });
  }, [order.products, deliveryDate]);

  const handleRemoveProduct = (productIdOrSku) => {
    OrderManager.removeProductFromOrder(productIdOrSku);
    setOrder(OrderManager.getOrderFromLocalStorage());
  };

  const handleUpdateQuantity = (productIdOrSku, updatedFields) => {
    OrderManager.updateProductInOrder(productIdOrSku, updatedFields);
    setOrder(OrderManager.getOrderFromLocalStorage());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!order.user_id) {
        toast.error('Debes iniciar sesión antes de enviar la orden.');
        setIsSubmitting(false);
        return;
      }
      if (!order.shop_id) {
        toast.error('No se pudo determinar la tienda. Vuelve a la página del comercio y agrega productos.');
        setIsSubmitting(false);
        return;
      }

      const newOrderData = {
        user_id: order.user_id,
        shop_id: order.shop_id,
        products: order.products.map(p => ({
          id: p._id || p.id || p.sku,
          quantity: p.quantity,
          clarification: p.clarification || undefined,
        })),
        deliver_date: deliveryDate.toISOString(),
      };

      console.log('Submitting order data:', newOrderData);
      await orderCreate(newOrderData);
      toast.success('Order placed successfully!');

      OrderManager.clearOrder();
      setOrder(OrderManager.getOrderFromLocalStorage());

    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Error creating order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <FormContainer onSubmit={handleSubmit}>
      <Header>
        <h2>Place an Order</h2>
        <p>Review your order and select a delivery date to proceed.</p>
      </Header>

      {order.products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>
          No products in your order. Please add items to continue.
        </p>
      ) : (
        <>
          <Section>
            <SectionTitle>Order Summary</SectionTitle>
            <OrderSummary
              items={order.products}
              onDelete={handleRemoveProduct}
              onQuantityChange={handleUpdateQuantity}
              isReduced={false}
            />
          </Section>

          <Section>
            <SectionTitle>Delivery Details</SectionTitle>
            <DatePickerWrapper>
              <label>Delivery Date:</label>
              <DatePicker
                selected={deliveryDate}
                onChange={(date) => setDeliveryDate(date)}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </DatePickerWrapper>
          </Section>

          <Section>
            <TotalsDisplay totals={orderTotals} />
          </Section>
        </>
      )}

      <Button
        type="submit"
        disabled={order.products.length === 0 || isSubmitting}
        variant="primary"
      >
        {isSubmitting ? 'Sending...' : 'Send Order'}
      </Button>
      <ToastContainer position="bottom-right" />
    </FormContainer>
  );
}

export default OrderForm;