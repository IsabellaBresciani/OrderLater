import React from "react";

const OrderDetailView = ({ items }) => {
  if (!items || items.length === 0)
    return <p className="text-muted text-center mt-3">No items in this order.</p>;

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle text-center">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item._id || i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.unit_price?.toFixed(2)}</td>
              <td>${item.subtotal?.toFixed(2)}</td>
              <td>${item.discount?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailView;
