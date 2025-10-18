// src/pages/orders/ShopOrders.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getShopOrders from "../../services/getShopOrders.js";
import OrdersTable from "../../components/order/OrdersTable.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import Toast from "../../utils/Toast.js";
import axios from "axios";
import baseURL from "../../services/baseURL.js";

const ShopOrders = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const { authToken, currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Block access if not owner
    if (currentUser.role !== "business_owner") {
      setShowModal(true);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        
        const ordersData = await getShopOrders(shopId, authToken);
        setOrders(ordersData);

       
        const shopRes = await axios.get(`${baseURL()}/api/shops`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const shopList = shopRes.data?.shops || [];
        const currentShop = shopList.find((s) => s._id === shopId);

        if (currentShop) {
          setShopName(currentShop.name);
        } else {
          setShopName("Unnamed Shop");
        }
      } catch (error) {
        console.error(error);
        Toast({
          icon: "error",
          title: "Error",
          text: "Unable to fetch shop or orders.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId, authToken, currentUser]);

  return (
    <div className="container mt-5">
      {/* 🚫 Modal for non-owner users */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h5 className="modal-title">Access Restricted</h5>
              </div>
              <div className="modal-body">
                <p>
                  You are not the owner of any registered shop on this platform.
                </p>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => (navigate(-1))}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Orders list */}
      {!showModal && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              Orders for:{" "}
              <span className="text-primary">
                {shopName || "Loading shop..."}
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2">Loading orders...</p>
            </div>
          ) : (
            <OrdersTable orders={orders} />
          )}
        </>
      )}
    </div>
  );
};

export default ShopOrders;
