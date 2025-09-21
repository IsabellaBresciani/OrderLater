import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../services/productService';
import ProductCard from './ProductCard';
import Toast from '../../utils/Toast';

const ProductList = () => {
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
        Toast({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los productos de la tienda.' });
      } finally {
        setLoading(false);
      }
    };

    if (shopId) {
      fetchProducts();
    }
  }, [shopId]);

  if (loading) {
    return <div className="text-center mt-5"><h4>Cargando productos...</h4></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-5 text-center fw-bold">Nuestros Productos</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">Aún no hay productos en esta tienda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;