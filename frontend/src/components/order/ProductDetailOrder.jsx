import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderManager } from '../../utils/OrderManager.js';

const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '15px',
  backgroundColor: '#ffffff',
  padding: '1.5rem',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
};

const ProductDetailOrder = ({ product, userId, shopId, onCancel, onAdded }) => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleAdd = (e) => {
    e.preventDefault();

    if (!quantity || Number(quantity) <= 0) {
      setError("Can't make the order because the quantity is negative or zero");
      return;
    }

    setError("");

    // Guardar en localStorage con OrderManager (asegurando id/_id)
    OrderManager.addProductToOrder({        
      _id: product._id || product.id,
      sku: product.sku,
      name: product.name,
      price: product.unit_price ?? product.price,
      advance_in_days: product.advance_in_days,
      discount: product.discount,
      quantity: Number(quantity),
      clarification: note,
    });

    if (onAdded) onAdded();

    alert('added to order');
    navigate(-1);
  };

  return (
    <div style={cardStyle}>
      <h5 className="mb-4">Add to my order</h5>

      <form onSubmit={handleAdd}>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="note" className="form-label">Something to clarify?</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-danger d-flex align-items-center gap-2"
          >
            <i className="bi bi-x-circle"></i> Cancel
          </button>

          <button 
            type="submit"
            className="btn btn-primary d-flex align-items-center gap-2"
          >
            <i className="bi bi-cart"></i>
            Add to order
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetailOrder;
