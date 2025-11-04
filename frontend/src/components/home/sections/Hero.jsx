import React from "react";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopsClick = () => {
    navigate('/shops');
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="display-3 fw-bold mb-4">
                Planifica hoy,<br />
                <span className="text-gradient">ahorra mañana</span>
              </h1>
              <p className="lead mb-4">
                Reserva productos y servicios para tus eventos futuros y obtené 
                <strong> grandes descuentos</strong> por anticipación.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <button onClick={handleShopsClick} className="btn btn-primary btn-lg px-4">
                  Conocé nuestras tiendas
                </button>
                <a href="#como-funciona" className="btn btn-outline-dark btn-lg px-4">
                  Ver cómo funciona
                </a>
              </div>
              
              {/* Stats */}
              <div className="row mt-5 g-4">
                <div className="col-4">
                  <div className="stat-item">
                    <h3 className="fw-bold mb-0">5000+</h3>
                    <small className="text-muted">Pedidos realizados</small>
                  </div>
                </div>

                <div className="col-4">
                  <div className="stat-item">
                    <h3 className="fw-bold mb-0">98%</h3>
                    <small className="text-muted">Satisfacción</small>
                  </div>
                </div>

                <div className="col-4">
                  <div className="stat-item">
                    <h3 className="fw-bold mb-0">Sin</h3>
                    <small className="text-muted">descuento máximo</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=700&fit=crop" 
                alt="Evento planificado" 
                className="img-fluid rounded-4 shadow-lg"
              />
              <div className="floating-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="icon-circle">💰</div>
                  <div>
                    <div className="fw-bold">Ahorro garantizado</div>
                    <small className="text-muted">Descuentos por anticipación</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;