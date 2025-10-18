// src/components/orders/OrdersTable.jsx
import React from "react";
import OrderActions from "./OrderActions.jsx";

const OrdersTable = ({ orders }) => {
  if (!orders || orders.length === 0)
    return <p className="text-center mt-4 text-muted">No orders found.</p>;

  return (
    <div className="table-responsive mt-4 mb-5">
      <table
        className="table align-middle text-center"
        style={{
          borderCollapse: "separate",
          borderSpacing: "0 0.4rem",
          minWidth: "800px",
        }}
      >
        <thead style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <tr>
            <th style={{ padding: "0.75rem" }}>#</th>
            <th style={{ padding: "0.75rem" }}>Total</th>
            <th style={{ padding: "0.75rem" }}>Order Date</th>
            <th style={{ padding: "0.75rem" }}>Delivery Date</th>
            <th style={{ padding: "0.75rem" }}>Status</th>
            <th style={{ padding: "0.75rem" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => {
            const orderDate = new Date(order.createdAt);
            const deliveryDate = new Date(order.delivery_date || order.deliver_date);

            return (
              <tr
                key={order._id || order.id}
                style={{
                  background: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  borderRadius: "8px",
                }}
              >
                <td style={{ padding: "0.75rem" }}>
                  <strong>#{index + 1}</strong>
                </td>
                <td style={{ padding: "0.75rem" }}>
                  ${order.total?.toFixed(2) ?? "0.00"}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  {orderDate.toLocaleDateString()}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  {deliveryDate.toLocaleDateString()}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <span className="badge bg-primary text-capitalize">
                    {order.state}
                  </span>
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <OrderActions actions={order.actions} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
