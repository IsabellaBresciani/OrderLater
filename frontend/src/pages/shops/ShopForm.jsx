import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import shopService from '../../services/shopService';
import Toast from '../../utils/Toast';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/Button'; 

const ShopForm = () => {
  const { authToken, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_image_url: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name || !formData.address) {
      Toast({ icon: 'warning', title: 'Campos Incompletos', text: 'Nombre y dirección son obligatorios.' });
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
      if (!currentUser || currentUser.role !== 'business_owner') {
        Toast({ icon: 'error', title: 'Acceso denegado', text: 'Solo los owners pueden crear comercios.' });
        return;
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        logo_image_url: formData.logo_image_url,
        adress: formData.address,
        owner: currentUser.id
      };
      
      await shopService.createShop(payload, authToken);
      Toast({ icon: 'success', title: 'Comercio creado', text: 'Tu comercio se ha creado correctamente.' });
      navigate('/shops');
    } catch (err) {
      Toast({ icon: 'error', title: 'Error', text: err.message || 'No se pudo crear el comercio.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Crear Comercio</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 700 }}>
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
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL del logo</label>
          <input 
            name="logo_image_url" 
            value={formData.logo_image_url} 
            onChange={handleChange} 
            className="form-control" 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>

        <div className="d-flex gap-2">
          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'CREANDO...' : 'Crear Comercio'}
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

export default ShopForm;