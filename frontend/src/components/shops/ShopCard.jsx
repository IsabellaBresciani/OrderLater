import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

// --- Base Styles (unchanged from source) ---
const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '15px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out, boxShadow 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative', 
};
const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
};
const cardBodyStyle = {
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};
const titleStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#333',
};
const descriptionStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '1rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
};
// --- OVERLAY STYLE ---
const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    flexDirection: 'column', // Changed to column to center buttons vertically
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px', // Space between buttons
    zIndex: 10,
    opacity: 0,
    transition: 'opacity 0.3s ease',
};
// -------------------------

const ShopCard = ({ shop }) => {
  const { currentUser } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  const isOwner = currentUser && currentUser.role === "business_owner";
  
  const productsPath = `/shops/${shop._id}/products`;
  const ordersPath = `/shops/${shop._id}/orders`;

  return (
    <div 
      className="col-md-3 mb-4 text-center border-2 rounded-3 p-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={cardStyle}>
        
        {/* --- ACTIONS OVERLAY (Conditional) --- */}
        {isOwner && (
            <div style={{ ...overlayStyle, opacity: isHovered ? 1 : 0 }}>
                
                <Link to={ordersPath} className="btn btn-primary btn-lg" style={{ backgroundColor: '#168a40ff', borderColor: '#168a40ff' }}>
                    Ver Órdenes
                </Link>
                
                <Link to={productsPath} className="btn btn-primary btn-lg">
                    Ver Productos
                </Link>
            </div>
        )}
        
        
        <Link to={productsPath} className="text-decoration-none" style={{pointerEvents: isOwner && isHovered ? 'none' : 'auto'}}>
          <img
            src={shop.logo_image_url || "https://via.placeholder.com/200"}
            alt={shop.name}
            style={imageStyle}
          />
          <div style={cardBodyStyle}>
            <h5 style={titleStyle}>{shop.name}</h5>
            <p style={descriptionStyle}>{shop.description.substring(0, 60)}...</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ShopCard;