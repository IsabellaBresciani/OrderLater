import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../../services/productService'; 
import Toast from '../../utils/Toast';
import { AuthContext } from '../../context/AuthContext'; 
import Button from '../Button'; 

const ProductEditForm = () => {
  const { authToken } = useContext(AuthContext); 
  const { shopId, productId } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(productId); 
        
        setFormData({
          sku: data.sku || '',
          name: data.name || '',
          description: data.description || '',
          image_url: data.image_url || '',
          unit_price: Number(data.unit_price) || 0,
          discount: Number(data.discount) || 0,
          advance_in_days: Number(data.advance_in_days) || 1,
          measure: data.measure || 'unit',
        });
      } catch (error) {
        Toast({ icon: 'error', title: 'Error', text: 'No se pudo cargar el producto para edición.' });
        navigate(-1); 
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    const newValue = type === 'number' ?
      (value === '' ? '' : Number(value)) : value; 
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const validate = () => {
    
    if (!formData.name || !formData.description || !formData.image_url || formData.unit_price === '' || formData.advance_in_days === '' || !formData.measure || !formData.sku) {
      Toast({ icon: 'warning', title: 'Campos Incompletos', text: 'Todos los campos son obligatorios.' });
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
    setIsSubmitting(true); 
    
    try {
      const payload = {
        ...formData,
        shop: shopId, 
      };
      
      
      await productService.updateProduct(productId, payload, authToken); 
      
      Toast({ icon: 'success', title: 'Producto Actualizado', text: 'El producto se ha actualizado correctamente.' });
      navigate(`/shops/${shopId}/products`); 
    } catch (err) {
      Toast({ icon: 'error', title: 'Error', text: err.message || 'No se pudo actualizar el producto.' }); 
    } finally {
      setIsSubmitting(false); 
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><h4>Cargando producto para edición...</h4></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Producto</h2>
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
            disabled={isSubmitting}
          >
            {isSubmitting ?
            'ACTUALIZANDO...' : 'Actualizar Producto'} 
          </Button>
          <Button 
            variant="secondary" 
            type="button" 
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancelar 
          </Button>
        </div>
      </form>
    </div>
  );
}; 

export default ProductEditForm;