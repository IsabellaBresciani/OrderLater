import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import OrderSummary from "./OrderSummary.jsx";
import Button from "../Button.jsx";
import getOrderById from "../../services/getOrderById.js";

const OrderDetailModal = ({ orderId, onClose }) => {
  const { authToken } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      console.warn("⚠️ [OrderDetailModal] No orderId provided, skipping fetch");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await getOrderById(orderId, authToken);
        setOrder(response);
      } catch (error) {
        console.error("❌ Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, authToken]);

  if (!order && !loading) {
    return (
      <div
        className="modal show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "75vw" }}>
          <div className="modal-content border-0 p-4 text-center">
            <h5>No se encontraron datos para esta orden.</h5>
            <Button variant="secondary" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "75vw" }}>
        <div className="modal-content border-0 p-4">
          <div className="modal-header border-0">
            <h5 className="modal-title">Order Detail</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <div className="modal-body">
              <p><strong>Order ID:</strong> {order?._id}</p>
              <p><strong>Status:</strong> {order?.state}</p>
              <p><strong>Shop:</strong> {order?.shop?.name || "N/A"}</p>
              <p><strong>User:</strong> {order?.user?.email || "N/A"}</p>
              <p>
                <strong>Delivery date:</strong>{" "}
                {order?.deliver_date
                  ? new Date(order.deliver_date).toLocaleDateString()
                  : "N/A"}
              </p>
              <hr />
              <h6>Items</h6>
              <OrderSummary items={order?.items || []} isReduced={false} />
              <hr />
              <p><strong>Total:</strong> ${order?.total?.toFixed(2)}</p>
              <p><strong>Discount:</strong> ${order?.total_discount?.toFixed(2)}</p>
            </div>
          )}

          <div className="modal-footer border-0">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
