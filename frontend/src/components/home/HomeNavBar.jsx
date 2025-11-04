import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeNavBar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      {/* container con padding lateral mayor */}
      <div className="container-fluid d-flex align-items-center justify-content-between px-4">
        {/* Parte 1: Logo (izquierda) */}
        <div className="d-flex align-items-center ps-2">
          <a className="navbar-brand me-2" href="/">
            <img src="/order_later_logo.png" alt="OrderLater" height="42" className="d-inline-block align-top" />
          </a>
          {/* Toggler (visible en pantallas pequeñas) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Parte 2: Enlaces centrales (centrados y con spacing entre ellos) */}
        <div className="collapse navbar-collapse justify-content-center flex-grow-1" id="navbarNav">
          <ul className="navbar-nav d-flex flex-row gap-4">
            <li className="nav-item">
              <a className="nav-link" href="#como-funciona">Cómo funciona</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#categorias">Categorías</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#beneficios">Beneficios</a>
            </li>
          </ul>
        </div>

        {/* Parte 3: Botón (derecha) con padding a la derecha */}
        <div className="d-flex align-items-center pe-2">
          <button className="btn btn-outline-light" onClick={handleLoginClick}>
            Ingresar
          </button>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavBar;