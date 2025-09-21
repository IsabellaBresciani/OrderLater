import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';
import OrderSummary from './OrderSummary.jsx';
import TotalsDisplay from './TotalsDisplay.jsx';
import orderCreate from '../services/orderCreate.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const FormContainer = styled.form`
  background: #f9fafb; /* Lighter, more modern background */
  padding: 2.5rem 3rem; /* More generous padding */
  border-radius: 16px; /* Slightly larger border-radius */
  box-shadow: 0 4px 20px rgba(0,0,0,0.05); /* Softer shadow */
  max-width: 600px; /* Wider for better content display */
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

const mockOrder = {
  user_id: "68cf35355d0307a943206502",
  commerce_id: "68cf3f02a82f68b4e636457e",
  products: [
    {
      _id: "68cf5855dd378731e5b7dd77",
      sku: "PAN001",
      name: "Pan Francés",
      description: "Clásico pan francés crocante por fuera y suave por dentro",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bBe43jKiqH2qGB…",
      price: 250,
      quantity: 2,
      clarification: "",
      discount: 40,
      advance_in_days: 2,
      measure: "unit",
      shop: "68cf3f02a82f68b4e636457e"
    },
    {
      _id: "68cf597ea88c72c0acceefeb",
      sku: "FACT001",
      name: "Factura de Dulce de Leche",
      description: "Deliciosa factura rellena de dulce de leche artesanal",
      image_url: "https://cdn0.recetasgratis.net/es/posts/2/2/9/facturas_de_dulce_de_lec…",
      price: 150,
      quantity: 3,
      clarification: "",
      discount: 0,
      advance_in_days: 0,
      measure: "unit",
      shop: "68cf3f02a82f68b4e636457e"
    },
    {
      _id: "68cf598ba88c72c0acceefee",
      sku: "MED001",
      name: "Medialuna",
      description: "Medialuna de manteca fresca, ideal para acompañar con café",
      image_url: "https://resizer.glanacion.com/resizer/v2/medialunas-faciles-de-M2NJ4M5…",
      price: 120,
      quantity: 5,
      clarification: "",
      discount: 0,
      advance_in_days: 0,
      measure: "unit",
      shop: "68cf3f02a82f68b4e636457e"
    }
  ]
};

function OrderForm() {
  const [ order , setOrder ]  = useState(mockOrder);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [calculatedItems, setCalculatedItems] = useState([]);
  const [orderTotals, setOrderTotals] = useState({ subtotal: 0, discount: 0, total: 0 });

  useEffect(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    const today = new Date();
    const diffTime = deliveryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const itemsWithCalculations = order.products.map(item => {
      let itemDiscount = 0;
      // Example discount logic, adapt as needed
      if (item.minAnticipationDays && diffDays >= item.minAnticipationDays) {
        itemDiscount = (item.price * item.quantity) * (item.discountPercent / 100);
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

 

  return (
    <FormContainer >
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Place an Order</h2>
      {order.products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>
          No products in your order. Please add items to continue.
        </p>
      ) : (
        <>
          <OrderSummary items={calculatedItems} />
          <DatePickerWrapper>
            <label>Delivery Date:</label>
            <DatePicker
              selected={deliveryDate}
              onChange={(date) => setDeliveryDate(date)}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
          </DatePickerWrapper>
          <TotalsDisplay totals={orderTotals} />
        </>
      )}
      <Button
        type="submit"
        disabled={order.products.length === 0}
        variant="primary"
      >
        Send Order
      </Button>
    </FormContainer>
  );
}

export default OrderForm;