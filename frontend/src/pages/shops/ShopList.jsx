import React, { useState, useEffect } from 'react';
import shopService from '../../services/shopService';
import ShopCard from '../../components/shops/ShopCard';
import Toast from '../../utils/Toast';

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const data = await shopService.getAllShops();
        setShops(data);
      } catch (error) {
        Toast({ icon: 'error', title: 'Error', text: 'Failed to fetch shops.' });
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><h4>Loading shops...</h4></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Shops</h2>
      <div className="row">
        {shops.length > 0 ? (
          shops.map(shop => (
            <ShopCard key={shop._id} shop={shop} />
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No shops found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopList;
