import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../../services/productService';
import Toast from '../../utils/Toast';
import { AuthContext } from '../../context/AuthContext';
import Button from '../Button';

const ProductForm = () => {
  const { authToken } = useContext(AuthContext);
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    image_url: '',
    unit_price: 0,
    discount: 0,
    advance_in_days: 1,
    measure: 'unit',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Parse numeric inputs
    const newValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const validate = () => {
    // Basic validation for required fields
    if (!formData.name || !formData.description || !formData.image_url || formData.unit_price === '' || formData.advance_in_days === '' || !formData.measure) {
      Toast({ icon: 'warning', title: 'Campos Incompletos', text: 'Todos los campos son obligatorios, incluyendo el precio.' });
      return false;
    }
    if (formData.unit_price <= 0) {
      Toast({ icon: 'warning', title: 'Precio Inválido', text: 'El precio debe ser mayor a cero.' });
      return false;
    }
    return true;
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const payload = {
        ...formData,
        shop: shopId, // Inject the shopId from URL params
      };

      await productService.createProduct(payload, authToken); // New service method
      Toast({ icon: 'success', title: 'Producto creado', text: 'El producto se ha creado correctamente.' });
      navigate(`/shops/${shopId}/products`); // Go back to the products list
    } catch (err) {
      Toast({ icon: 'error', title: 'Error', text: err.message || 'No se pudo crear el producto.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 700 }}>
        <div className="mb-3">
          <label className="form-label">SKU</label>
          <input 
            name="sku" 
            value={formData.sku} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            className="form-control" 
            rows={3} 
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL de la Imagen</label>
          <input 
            name="image_url" 
            value={formData.image_url} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Precio Unitario ($)</label>
            <input 
              name="unit_price" 
              type="number"
              min="0.01"
              step="0.01"
              value={formData.unit_price} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Descuento (%)</label>
            <input 
              name="discount" 
              type="number"
              min="0"
              max="100"
              step="1"
              value={formData.discount} 
              onChange={handleChange} 
              className="form-control" 
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Avance en Días</label>
            <input 
              name="advance_in_days" 
              type="number"
              min="0"
              step="1"
              value={formData.advance_in_days} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Medida</label>
            <select
              name="measure"
              value={formData.measure}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="kg">kg</option>
              <option value="unit">unit</option>
              <option value="liter">liter</option>
            </select>
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'CREANDO...' : 'Crear Producto'}
          </Button>
          <Button 
            variant="secondary" 
            type="button" 
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;