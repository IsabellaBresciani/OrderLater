import React from "react";

const Benefits = () => {
  const benefits = [
    {
      icon: '💰',
      title: 'Obtené grandes descuentos',
      description: 'Ahorra más mientras más anticipado hagas tu pedido'
    },
    {
      icon: '📅',
      title: 'Planifica con tiempo',
      description: 'Organiza tus eventos sin estrés de última hora'
    },
    {
      icon: '✅',
      title: 'Garantía asegurada',
      description: 'Tu pedido confirmado para la fecha que necesites'
    },
    {
      icon: '🎁',
      title: 'Ofertas exclusivas',
      description: 'Accede a productos y servicios únicos para reservas anticipadas'
    }
  ];
  
  return (
    <section id="beneficios" className="py-5 bg-dark text-white">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">¿Por qué reservar con anticipación?</h2>
          <p className="lead opacity-75">Múltiples beneficios para ti</p>
        </div>

        <div className="row g-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h4 className="fw-bold mt-3 mb-2">{benefit.title}</h4>
                <p className="opacity-75 mb-0">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;