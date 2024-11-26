import React from 'react';
import './mainhome.css';

function MainHomePage() {
  return (
    <div className="homepage">
      
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Carpool Connect</h1>
          <p className="hero-description">
            Find your ride, share your journey, and save the planet. Together, we make every trip better.
          </p>
          <button className="hero-btn">Get Started</button>
        </div>
      </section>

      
      <section className="about">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Carpool Connect is your ultimate carpooling companion, connecting riders and drivers for safe, efficient,
          and eco-friendly travel. Whether you're heading to work, a trip, or just around town, our platform is here
          to make your journey hassle-free.
        </p>
        <p className="about-description">
          Join a community committed to reducing traffic, saving costs, and caring for the environment. With Carpool
          Connect, every trip becomes a story worth sharing!
        </p>
      </section>
    </div>
  );
}

export default MainHomePage;
