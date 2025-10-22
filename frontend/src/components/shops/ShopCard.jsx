import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

// --- Your style objects remain the same ---
const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '15px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out, boxShadow 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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


const ShopCard = ({ shop }) => {
  const { currentUser } = useContext(AuthContext);

  // You can define the path directly using a simple ternary operator.
  const destinationPath = currentUser.role === "business_owner"
    ? `/shops/${shop._id}/orders`
    : `/shops/${shop._id}/products`;

  return (
    <div className="col-md-3 mb-4 text-center border-2 rounded-3 p-2">
      {/* The 'to' prop now receives a string, as expected */}
      <Link to={destinationPath} className="text-decoration-none">
        <div style={cardStyle}>
          <img
            src={shop.logo_image_url || "https://via.placeholder.com/200"}
            alt={shop.name}
            style={imageStyle}
          />
          <div style={cardBodyStyle}>
            <h5 style={titleStyle}>{shop.name}</h5>
            <p style={descriptionStyle}>{shop.description.substring(0, 60)}...</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShopCard;

