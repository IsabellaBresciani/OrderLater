import React, { useState, useEffect, useContext} from 'react';
import shopService from '../../services/shopService';
import ShopCard from '../../components/shops/ShopCard';
import Toast from '../../utils/Toast';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        if (currentUser.role === 'business_owner') {
          console.log("Fetching shops for owner:", currentUser.id);
          const data = await shopService.getShopsByOwner(currentUser.id, authToken);
          setShops(data);
        } else {
          const data = await shopService.getAllShops(authToken);
          setShops(data);
        }
      } catch (error) {
        Toast({ icon: 'error', title: 'Error', text: 'Failed to fetch shops.' });
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const skeletonCardStyle = {
    border: '2px dashed #6c757d',
    borderRadius: '15px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  };

  const skeletonImageStyle = {
    width: '100%',
    height: '200px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const skeletonBodyStyle = {
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  if (loading) {
    return <div className="text-center mt-5"><h4>Loading shops...</h4></div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Shops</h2>
      </div>
      <div className="row">
        

        {/* Existing Shops */}
        {shops.length > 0 ? (
          shops.map(shop => (
            <ShopCard key={shop._id} shop={shop} />
          ))
        ) : (
          !currentUser || currentUser.role !== 'owner' ? (
            <div className="col-12 text-center">
              <p>No shops found yet.</p>
            </div>
          ) : null
        )}

        {/* Skeleton Card for Owners */}
        {currentUser && currentUser.role === 'business_owner' && (
          <div className="col-md-3 mb-4 text-center border-2 rounded-3 p-2">
            <div 
              style={skeletonCardStyle}
              onClick={() => navigate('/shops/form')}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0d6efd';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#6c757d';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={skeletonImageStyle}>
                <svg width="64" height="64" fill="#6c757d" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </div>
              <div style={skeletonBodyStyle}>
                <h5 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#6c757d' }}>
                  Crear Nuevo Comercio
                </h5>
                <p style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: 0 }}>
                  Click para agregar
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopList;