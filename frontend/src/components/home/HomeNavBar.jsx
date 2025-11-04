import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeNavBar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid d-flex align-items-center justify-content-between px-4 px-lg-5">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center ps-2 ps-lg-3" href="/">
          <img src="/order_later_logo.png" alt="OrderLater" height="42" className="d-inline-block align-top" />
        </a>

        <div className="d-flex align-items-center">
          {/* Toggler (visible en pantallas pequeñas) */}
          <button
            className="navbar-toggler me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex flex-row gap-4 align-items-center mb-0">
              <li className="nav-item">
                <a className="nav-link" href="#como-funciona">Cómo funciona</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#beneficios">Beneficios</a>
              </li>
            </ul>
          </div>

          <div className="ms-4 pe-2 pe-lg-3">
            <button className="btn btn-outline-light" onClick={handleLoginClick}>
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavBar;