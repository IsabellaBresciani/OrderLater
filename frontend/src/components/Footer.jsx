import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h5 className="fw-bold mb-3">
                <img src="/order_later_logo.png" alt="OrderLater" height="42" className="d-inline-block align-top" />
              </h5>
              <p className="opacity-75">
                La plataforma líder en pedidos anticipados con descuentos garantizados.
              </p>
            </div>
            <div className="col-lg-2">
              <h6 className="fw-bold mb-3">Empresa</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white-50 text-decoration-none">Sobre nosotros</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Contacto</a></li>
              </ul>
            </div>
            <div className="col-lg-2">
              <h6 className="fw-bold mb-3">Soporte</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white-50 text-decoration-none">Centro de ayuda</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">FAQ</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Términos</a></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h6 className="fw-bold mb-3">Newsletter</h6>
              <p className="opacity-75 small">Recibe ofertas exclusivas</p>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Tu email"
                />
                <button className="btn btn-primary">Suscribir</button>
              </div>
            </div>
          </div>
          <hr className="my-4 opacity-25" />
          <div className="text-center opacity-75 small">
            © 2025 FutureOrder. Todos los derechos reservados.
          </div>
        </div>
      </footer>
  );
};

export default Footer;