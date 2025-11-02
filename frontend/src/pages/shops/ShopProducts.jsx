import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // Import styled-components
import productService from '../../services/productService';
import ProductCard from '../../components/products/ProductCard';
import Toast from '../../utils/Toast';
import Order from '../../components/order/Order';
import { AuthContext } from "../../context/AuthContext";

// --- Styled Components Definitions ---

const StyledContainer = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const SearchWrapper = styled.div`
  background-color: #343a40;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1020;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInputGroup = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  .form-control {
    border-radius: 50px;
    padding-left: 1.5rem;
    border: none;
    box-shadow: none !important;
  }
  .btn {
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: 0.5rem;
    transition: all 0.3s ease;
    background-color: #dc3545;
    border-color: #dc3545;
    &:hover {
      background-color: #c82333;
      transform: scale(1.1);
    }
  }
`;

const MainContent = styled.div`
  padding-top: 1rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  @media (min-width: 992px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const OrderWrapper = styled.div`
  position: sticky;
  top: 90px;
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  @media (max-width: 991.98px) {
    display: none;
  }
`;

// --- React Component ---

const ShopProducts = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { shopId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductsByShop(shopId);
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products for this shop.');
        Toast({ icon: 'error', title: 'Error', text: 'Failed to fetch products for this shop.' });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [shopId]);

  if (loading) {
    return <div className="text-center mt-5"><h4>Loading products...</h4></div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger"><h4>{error}</h4></div>;
  }

  return (
    <StyledContainer>
      {/* Top Search Bar */}
      <SearchWrapper>
        <div className="container-fluid">
          <SearchInputGroup>
            <input type="text" className="form-control" placeholder="Search for food..." aria-label="Search" />
            <button className="btn" type="button" aria-label="Search button">
              <i className="bi bi-search text-white"></i>
            </button>
          </SearchInputGroup>
        </div>
      </SearchWrapper>

      <MainContent className="container-fluid">
        <div className="row">
          {/* Products List Column */}
          <div className="col-lg-8 px-4">
            <h3 className="mb-4 fw-bold text-dark">All Products</h3>
            <ProductGrid>

              {currentUser && currentUser.role === 'business_owner' && (
                <div className="mb-4 text-center p-2" onClick={() => navigate(`/shops/${shopId}/products/form`)}>
                  <div
                    style={{
                      border: '2px dashed #030D59',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#007bff';
                      e.currentTarget.style.backgroundColor = '#e9f3ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#030D59';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: 'rgba(3, 13, 89, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <i className="bi bi-plus-circle-fill" style={{ fontSize: '3rem', color: '#030D59' }}></i>
                    </div>
                    <div style={{
                      padding: '1.5rem',
                      backgroundColor: '#ffffff',
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}>
                      <h5 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#030D59' }}>
                        Crear Nuevo Producto
                      </h5>
                      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: 0 }}>
                        Click para agregar un producto
                      </p>
                    </div>
                  </div>
                </div>
              )} 

              {products.length > 0 ? (
                products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="text-center col-12">
                  <p className="lead text-muted">No products found for this shop yet.</p>
                </div>
              )}
            </ProductGrid>
          </div>

          {/* Order Summary Column */}
          <div className="col-lg-4 d-none d-lg-block">
            <OrderWrapper>
              <Order shopId={shopId} />
            </OrderWrapper>
          </div>
        </div>
      </MainContent>
    </StyledContainer>
  );
};

export default ShopProducts;