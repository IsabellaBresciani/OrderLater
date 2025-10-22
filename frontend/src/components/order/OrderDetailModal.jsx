import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import OrderDetailView from "./OrderDetailView.jsx";
import Button from "../Button.jsx";
import getOrderById from "../../services/getOrderById.js";
import OrderActions from "./OrderActions.jsx";

const OrderDetailModal = ({ orderId, actions, refreshOrders, onClose }) => {
  const { authToken } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (!orderId) {
      console.warn("⚠️ [OrderDetailModal] No orderId provided, skipping fetch");
      setLoading(false);
      return;
    }

    fetchOrder();
  }, [orderId, authToken]);

  const handleActionComplete = async () => {
    setLoading(true);
    await fetchOrder();
    if (refreshOrders) await refreshOrders();
  };

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
            <Button variant="danger" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const displayActions = actions || order?.actions || [];
  const hasActionsToShow = displayActions.filter(action => action !== "view_details").length > 0;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "55vw", maxHeight: "60vh" }}>
        <div className="modal-content border-0 p-4">
          <div className="modal-header border-0">
            <h5 className="modal-title w-100 text-center fw-bold">Order Detail</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <div className="modal-body text-start">
              <p><strong>Order ID:</strong> {order?._id}</p>
              <p><strong>Status:</strong> {order?.state}</p>
              <p><strong>Shop:</strong> {order?.shop?.name || "N/A"}</p>
              <p><strong>User:</strong> {order?.user?.email || "N/A"}</p>
              <p>
                <strong>Order date:</strong>{" "}
                {order?.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Delivery date:</strong>{" "}
                {order?.deliver_date
                  ? new Date(order.deliver_date).toLocaleDateString()
                  : "N/A"}
              </p>
              <hr />
              <h6>Items</h6>
              <OrderDetailView items={order?.items || []} />
              <hr />
              <p className="text-end"><strong>Total:</strong> ${order?.total?.toFixed(2)}</p>
              <p className="text-end"><strong>Discount:</strong> ${order?.total_discount?.toFixed(2)}</p>

              {hasActionsToShow && (
                <>
                  <hr />
                  <h6 className="mb-3">Actions</h6>
                  <div className="d-flex justify-content-start">
                    <OrderActions
                      actions={displayActions}
                      orderId={order._id || order.id}
                      refreshOrders={handleActionComplete}
                      hideDetailAction={true}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <div className="modal-footer border-0 justify-content-end">
            <Button variant="danger" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;