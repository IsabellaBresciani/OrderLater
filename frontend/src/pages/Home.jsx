import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/home/styles/homepage.css';
import HomeNavBar from '../components/home/HomeNavBar';
import Footer from '../components/Footer';
import Hero from '../components/home/sections/Hero';
import HowItWorks from '../components/home/sections/HowItWorks';
import Benefits from '../components/home/sections/Benefits';
import CallToAction from '../components/home/sections/CallToAction';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <HomeNavBar />

      {/* Hero Section */}
      <Hero />

      {/* Cómo funciona */}
      <HowItWorks />

      {/* Beneficios */}
      <Benefits />

      {/* CTA Section */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;