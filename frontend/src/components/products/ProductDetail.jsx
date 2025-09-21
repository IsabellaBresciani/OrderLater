import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../../services/productService'; 
import Toast from '../../utils/Toast';
import ProductDetailOrder from '../order/ProductDetailOrder';

const detailContainerStyle = {
  padding: '2rem',
  borderRadius: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  position: 'relative',
};

const imageStyle = {
  width: '100%',
  maxHeight: '450px',
  objectFit: 'cover',
  borderRadius: '15px',
};

const currentUser = JSON.parse(localStorage.getItem("currentUser")); 
const userId = currentUser ? currentUser._id : null;

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(productId);
        setProduct(data);
      } catch (error) {
        Toast({ icon: 'error', title: 'Error', text: 'Failed to fetch product details.' });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="text-center mt-5"><h4>Loading product...</h4></div>;
  }

  if (!product) {
    return <div className="text-center mt-5"><h2>Product not found</h2></div>;
  }

  return (
    <>
      <div className="container mt-5">
        <div style={detailContainerStyle}>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-light position-absolute top-0 end-0 m-3"
          >
            <i className="bi bi-x-lg"></i>
          </button>

          <div className="row">
            <div className="col-md-6">
              <img src={product.image_url} alt={product.name} style={imageStyle} />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h1 className="mb-3">{product.name}</h1>
              <p className="lead text-muted mb-4">{product.description}</p>
              <div className="d-flex align-items-center mb-4">
                <h2 className="fw-bold me-3" style={{ color: '#030D59' }}>${product.unit_price}</h2>
                {product.discount > 0 && (
                  <span className="badge bg-success">-{product.discount}% OFF</span>
                )}
              </div>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Measure:</strong> {product.measure}</p>
              <p><strong>Advance in days:</strong> {product.advance_in_days}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <ProductDetailOrder 
          product={product} 
          userId={userId} 
          onCancel={() => navigate(-1)} 
          onAdded={() => alert('added to order')} 
        />
      </div>
    </>
  );
};

export default ProductDetail;
