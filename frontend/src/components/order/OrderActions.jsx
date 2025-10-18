import React from "react";

const iconMap = {
  view_details: { icon: "bi-eye", color: "#adb5bd" },     // gray
  approve: { icon: "bi-check-lg", color: "#28a745" },     // green
  reject: { icon: "bi-x-lg", color: "#dc3545" },           // red
  pay: { icon: "bi-cash-coin", color: "#0d6efd" },         // blue
  complete: { icon: "bi-truck", color: "#ffc107" },        // yellow
  cancel: { icon: "bi-x-octagon", color: "#fd7e14" },      // orange
  delete: { icon: "bi-trash", color: "#6c757d" },          // gray
};

const OrderActions = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  const handleActionClick = (action) => {
    alert(`Action triggered: ${action}`);
  };

  return (
    <div className="d-flex flex-wrap justify-content-center gap-2">
      {actions.map((action) => {
        const { icon, color } = iconMap[action] || { icon: "bi-question", color: "#6c757d" };

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
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i className={`bi ${icon}`} style={{ fontSize: "1.1rem" }}></i>
          </button>
        );
      })}
    </div>
  );
};

export default OrderActions;
