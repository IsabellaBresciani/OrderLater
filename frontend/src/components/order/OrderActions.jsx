import React, { useState } from "react";
import Button from "../Button.jsx";

const iconMap = {
  view_details: { icon: "bi-eye", color: "#6c757d" }, 
  approve: { icon: "bi-check-lg", color: "#28a745" }, 
  reject: { icon: "bi-x-lg", color: "#dc3545" }, 
  pay: { icon: "bi-cash-coin", color: "#0d6efd" }, 
  complete: { icon: "bi-truck", color: "#ffc107" }, 
  cancel: { icon: "bi-x-octagon", color: "#fd7e14" }, 
  delete: { icon: "bi-trash", color: "#f10d0dff" }, 
};

const OrderActions = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  const [modalOpen, setModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);

  const handleActionClick = (action) => {
    setCurrentAction({
      name: action,
      ...(iconMap[action] || { icon: "bi-question" }),
    });
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setCurrentAction(null);
  };

  const handleConfirm = () => {
    alert(`Action triggered: ${currentAction?.name}`);
    setModalOpen(false);
    setCurrentAction(null);
  };

  // Determinar variante del botón
  const confirmVariant = (() => {
    if (["reject", "delete", "cancel"].includes(currentAction?.name)) {
      return "danger"; // rojo
    }
    if (["approve"].includes(currentAction?.name)) {
      return "success"; // usaremos verde custom por style
    }
    if (["view_details"].includes(currentAction?.name)) {
      return "primary"; // azul Bootstrap
    }
    return "primary"; // por defecto
  })();

  
  const customButtonStyle =
    currentAction?.name === "approve"
      ? { backgroundColor: "#0ab432ff", border: "none", color: "#fff" }
      : {};

  const formattedAction = currentAction?.name?.replace("_", " ") || "";
  const actionIcon = currentAction?.icon || "bi-question";

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {actions.map((action) => {
          const { icon, color } = iconMap[action] || {
            icon: "bi-question",
            color: "#6c757d",
          };

          return (
            <button
              key={action}
              className="border-0 d-flex align-items-center justify-content-center"
              onClick={() => handleActionClick(action)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: color,
                color: "#fff",
                transition: "transform 0.1s ease-in-out",
              }}
              title={action.replace("_", " ")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <i className={`bi ${icon}`} style={{ fontSize: "1.1rem" }}></i>
            </button>
          );
        })}
      </div>

      {modalOpen && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 text-center">
              <div className="modal-header border-0">
                <h5 className="modal-title w-100">Confirm Action</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to {formattedAction}?</p>
              </div>
              <div className="modal-footer border-0 justify-content-end gap-2">
                <Button variant="secondary" onClick={handleCancel}>
                  Go Back
                </Button>
                <Button
                  variant={confirmVariant}
                  onClick={handleConfirm}
                  style={customButtonStyle}
                >
                  <i className={`bi ${actionIcon} me-2`}></i>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderActions;
