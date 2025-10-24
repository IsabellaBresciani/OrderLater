import React, { useEffect, useState, useContext } from "react";
import UserOrdersTable from "../../components/order/UserOrdersTable.jsx";
import getUserOrders from "../../services/getUserOrders.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import Toast from "../../utils/Toast.js";

const UserOrders = () => {
  const { currentUser, authToken } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      console.log("Current user:", currentUser);
      console.log("Auth token:", authToken ? "exists" : "missing");
      
      if (!currentUser?.id) {
        console.warn("No user ID available");
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const data = await getUserOrders(currentUser.id, authToken);
      console.log("Orders fetched:", data);
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Toast({ 
        icon: "error", 
        title: "Error fetching your orders",
        text: error.response?.data?.message || error.message 
      });
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser?.id, authToken]);

  if (!currentUser) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          Please log in to view your orders.
        </div>
      </div>
    );
  }

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