import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import getShopOrders from "../../services/getShopOrders.js";
import OrdersTable from "../../components/order/OrdersTable.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import Toast from "../../utils/Toast.js";

const ShopOrders = () => {
  const { shopId } = useParams();
  const { authToken, currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getShopOrders(shopId, authToken);
        setOrders(data);
      } catch (error) {
        Toast({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los pedidos.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [shopId, authToken]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Pedidos del Comercio</h2>
        <small className="text-muted">
          Dueño: {currentUser.first_name} {currentUser.last_name}
        </small>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Cargando pedidos...</p>
        </div>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
};

export default ShopOrders;
