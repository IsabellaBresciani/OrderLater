import React from "react";

const OrderActions = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  const handleActionClick = (action) => {
    alert(`Acción seleccionada: ${action}`);
  };

  return (
    <div className="d-flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action}
          className={`btn btn-sm ${
            action === "approve"
              ? "btn-success"
              : action === "reject"
              ? "btn-danger"
              : "btn-secondary"
          }`}
          onClick={() => handleActionClick(action)}
        >
          {action.charAt(0).toUpperCase() + action.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default OrderActions;
