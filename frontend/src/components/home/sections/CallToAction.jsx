import React from "react";
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <section className="cta-section py-5">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold mb-4">
              Comienza a planificar tu próximo evento
            </h2>
            <p className="lead mb-4">
              Únete a miles de personas que ya están ahorrando con pedidos anticipados
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button onClick={handleLoginClick} className="btn btn-primary btn-lg px-5">
                Crear cuenta gratis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;