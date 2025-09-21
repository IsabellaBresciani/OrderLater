import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../services/productService';
import ProductCard from '../../components/products/ProductCard';
import Toast from '../../utils/Toast';

const ShopProducts = () => {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductsByShop(shopId);
        setProducts(data);
      } catch (error) {
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

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No products found for this shop yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProducts;