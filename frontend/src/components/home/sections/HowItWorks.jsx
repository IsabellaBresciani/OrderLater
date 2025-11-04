import React from "react";

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-5 bg-light">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">¿Cómo funciona?</h2>
          <p className="lead text-muted">Simple, rápido y con grandes ahorros</p>
        </div>
        
        <div className="row g-4">
          <div className="col-md-3">
            <div className="step-card text-center">
              <div className="step-number">1</div>
              <div className="step-icon">🔍</div>
              <h4 className="fw-bold mt-3">Explora</h4>
              <p className="text-muted">
                Busca productos y servicios para tu evento futuro
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="step-card text-center">
              <div className="step-number">2</div>
              <div className="step-icon">📅</div>
              <h4 className="fw-bold mt-3">Selecciona fecha</h4>
              <p className="text-muted">
                Elige cuándo necesitas tu pedido y ve el descuento
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="step-card text-center">
              <div className="step-number">3</div>
              <div className="step-icon">💳</div>
              <h4 className="fw-bold mt-3">Reserva</h4>
              <p className="text-muted">
                Confirma tu pedido con descuento por anticipación
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="step-card text-center">
              <div className="step-number">4</div>
              <div className="step-icon">🎉</div>
              <h4 className="fw-bold mt-3">Disfruta</h4>
              <p className="text-muted">
                Recibe tu pedido en la fecha acordada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;