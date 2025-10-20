import React, { useEffect, useState, useContext } from "react";
import UserOrdersTable from "../../components/order/UserOrdersTable.jsx";
import getUserOrders from "../../services/getUserOrders.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";

const UserOrders = () => {
  const { currentUser, authToken } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      if (!currentUser?.id) return;
      setLoading(true);
      const data = await getUserOrders(currentUser.id, authToken);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching your orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser, authToken]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">My Orders</h2>
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 text-muted">Loading your orders...</p>
        </div>
      ) : (
        <UserOrdersTable orders={orders} refreshOrders={fetchOrders} />
      )}
    </div>
  );
};

export default UserOrders;
