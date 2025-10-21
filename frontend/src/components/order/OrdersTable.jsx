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
        {/* ✅ Header con color forzado */}
        <thead>
          <tr style={{ backgroundColor: "#0d6efd" }}>
            {[
              "#",
              "User",
              "Total",
              "Order Date",
              "Delivery Date",
              "Status",
              "Actions",
            ].map((header, idx) => (
              <th
                key={idx}
                style={{
                  padding: "0.75rem",
                  color: "white",
                  backgroundColor: "#0d6efd",
                  fontWeight: "600",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => {
            const orderDate = new Date(order.createdAt);
            const deliveryDate = new Date(
              order.delivery_date || order.deliver_date
            );

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
                  {order.user
                    ? order.user.email ||
                    `${order.user.first_name || ""} ${order.user.last_name || ""}`.trim() ||
                    "Unknown"
                    : "Unknown"}
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
                  <span className="badge bg-primary text-capitalize fs-6">
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
