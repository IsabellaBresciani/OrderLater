import React, { useState } from 'react';
import ordersService from '../../services/ordersService.js';

const ProductDetailOrder = ({ productId, onCancel, onAdded }) => {
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!quantity || quantity <= 0) {
      setError("Can't make the order because the quantity is negative or zero");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await ordersService.createOrder(productId, Number(quantity), note);
      alert("Added to the order");
      if (onAdded) onAdded();
    } catch (err) {
      console.error("Add to order failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-4">Add to my order</h5>

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
              disabled={submitting}
              className="btn btn-danger d-flex align-items-center gap-2"
            >
              <i className="bi bi-x-circle"></i> Cancel
            </button>

            <button 
              type="submit" 
              disabled={submitting}
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <i className="bi bi-cart"></i>
              {submitting ? "Adding..." : "Add to order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailOrder;
