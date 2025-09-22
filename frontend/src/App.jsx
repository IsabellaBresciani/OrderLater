import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// --- Páginas de la Aplicación ---
import Auth from './pages/Auth.jsx';
import HealthCheck from './pages/HealthCheck.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AuthProvider from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import ShopProducts from './pages/shops/ShopProducts.jsx';
import ProductDetailPage from './pages/products/ProductDetailPage.jsx';
import ShopList from './pages/shops/ShopList.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
          <Route path="/health" element={<PublicRoute><HealthCheck /></PublicRoute>} />
          
          {/* Rutas Privadas */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/shops" element={<PrivateRoute><ShopList /></PrivateRoute>} />
          <Route path="/shops/:shopId/products" element={<PrivateRoute><ShopProducts /></PrivateRoute>} />
          <Route path="/shops/:shopId/products/:productId" element={<PrivateRoute><ProductDetailPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;