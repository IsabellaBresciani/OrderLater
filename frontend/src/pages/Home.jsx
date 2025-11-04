import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/home/styles/homepage.css';
import HomeNavBar from '../components/home/HomeNavBar';
import Footer from '../components/Footer';
import Hero from '../components/home/sections/Hero';

const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎯' },
    { id: 'comida', name: 'Comida', icon: '🍕' },
    { id: 'eventos', name: 'Eventos', icon: '🎉' },
    { id: 'decoracion', name: 'Decoración', icon: '🎈' },
    { id: 'servicios', name: 'Servicios', icon: '⚡' }
  ];

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

  const featuredProducts = [
    {
      id: 1,
      name: 'Catering para 50 personas',
      category: 'comida',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
      price: 15000,
      discount: 25,
      minDays: 15
    },
    {
      id: 2,
      name: 'Decoración de cumpleaños',
      category: 'decoracion',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      price: 8000,
      discount: 20,
      minDays: 10
    },
    {
      id: 3,
      name: 'Torta personalizada 3 pisos',
      category: 'comida',
      image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=300&fit=crop',
      price: 12000,
      discount: 30,
      minDays: 20
    },
    {
      id: 4,
      name: 'DJ para eventos',
      category: 'servicios',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
      price: 20000,
      discount: 15,
      minDays: 30
    }
  ];

  const filteredProducts = activeCategory === 'todos' 
    ? featuredProducts 
    : featuredProducts.filter(p => p.category === activeCategory);

  return (
    <div className="homepage">
      {/* Navbar */}
      <HomeNavBar />

      {/* Hero Section */}
      <Hero />

      {/* Cómo funciona */}
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

      {/* Categorías y Productos */}
      <section id="categorias" className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Explora por categoría</h2>
            <p className="lead text-muted">Encuentra lo que necesitas para tu evento</p>
          </div>

          {/* Category Filter */}
          <div className="category-filter mb-5">
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`btn category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="me-2">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="row g-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="col-md-6 col-lg-3">
                <div className="product-card">
                  <div className="product-image">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} />
                    <div className="discount-badge">-{product.discount}%</div>
                  </div>
                  <div className="product-body">
                    <h5 className="product-title">{product.name}</h5>
                    <div className="product-info mb-3">
                      <small className="text-muted">
                        📅 Reserva con {product.minDays} días de anticipación
                      </small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-muted text-decoration-line-through small">
                          ${product.price.toLocaleString()}
                        </div>
                        <div className="fw-bold fs-5 text-primary">
                          ${Math.round(product.price * (1 - product.discount / 100)).toLocaleString()}
                        </div>
                      </div>
                      <button className="btn btn-sm btn-primary">
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
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

      {/* CTA Section */}
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
                <button className="btn btn-primary btn-lg px-5">
                  Crear cuenta gratis
                </button>
                <button className="btn btn-outline-dark btn-lg px-5">
                  Explorar sin registro
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;