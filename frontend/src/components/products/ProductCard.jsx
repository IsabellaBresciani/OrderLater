import React from 'react';
import { Link } from 'react-router-dom';

const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '15px',
  overflow: 'hidden',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
  },
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const cardBodyStyle = {
  padding: '1.5rem',
  backgroundColor: '#ffffff',
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
};

const priceStyle = {
  fontSize: '1.3rem',
  fontWeight: 'bold',
  color: '#030D59',
};

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-3 mb-4 text-center border-2 rounded-3 p-2">
      <Link to={`/shops/${product.shop}/products/${product._id}`} className="text-decoration-none">
        <div style={cardStyle}>
          <img src={product.image_url} alt={product.name} style={imageStyle} />
          <div style={cardBodyStyle}>
            <h5 style={titleStyle}>{product.name}</h5>
            <p style={descriptionStyle}>{product.description.substring(0, 60)}...</p>
            <p style={priceStyle}>${product.unit_price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;