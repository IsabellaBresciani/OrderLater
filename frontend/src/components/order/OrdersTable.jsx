import React from "react";
import OrderActions from "./OrderActions.jsx";

const OrdersTable = ({ orders }) => {
  if (!orders || orders.length === 0)
    return <p className="text-center mt-4 text-muted">No hay pedidos disponibles.</p>;

  return (
    <div className="table-responsive mt-4">
      <table className="table table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Descuento</th>
            <th>Fecha de Entrega</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {order.user?.first_name} {order.user?.last_name}
                <br />
                <small className="text-muted">{order.user?.email}</small>
              </td>
              <td>${order.total.toFixed(2)}</td>
              <td>${order.total_discount.toFixed(2)}</td>
              <td>{new Date(order.delivery_date).toLocaleDateString()}</td>
              <td>
                <span className="badge bg-primary text-capitalize">
                  {order.state}
                </span>
              </td>
              <td>
                <OrderActions actions={order.actions} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
