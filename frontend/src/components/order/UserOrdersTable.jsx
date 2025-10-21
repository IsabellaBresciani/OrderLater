import React from "react";
import OrderActions from "./OrderActions.jsx";

const UserOrdersTable = ({ orders, refreshOrders }) => {
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
        <thead>
          <tr style={{ backgroundColor: "#0d6efd" }}>
            {["#", "Shop", "Total", "Order Date", "Deliver Date", "Status", "Actions"].map(
              (header, idx) => (
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
              )
            )}
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => {
            const orderDate = new Date(order.createdAt);
            const deliveryDate = new Date(order.deliver_date);
            const safeActions = order.actions?.filter(
              (a) => !["approve", "reject"].includes(a)
            );

            return (
              <tr key={order._id || order.id}>
                <td><strong>#{index + 1}</strong></td>
                <td>{order.shop_name || order.shop?.name || "Unknown"}</td>
                <td>${order.total?.toFixed(2)}</td>
                <td>{orderDate.toLocaleDateString()}</td>
                <td>{deliveryDate.toLocaleDateString()}</td>
                <td>
                  <span className="badge bg-primary text-capitalize fs-6">
                    {order.state}
                  </span>
                </td>
                <td>
                  <OrderActions
                    actions={safeActions}
                    orderId={order._id || order.id}
                    refreshOrders={refreshOrders}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrdersTable;
