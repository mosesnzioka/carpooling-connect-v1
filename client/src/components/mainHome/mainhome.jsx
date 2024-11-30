import React from "react";
import "./mainhome.css";

function MainHomePage() {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Carpool Connect</h1>
          <p className="hero-description">
            Find your ride, share your journey, and save the planet. Together,
            we make every trip better. feel free and more welcomed to create or
            join a pool using this platform.
          </p>
        </div>
      </section>

      <section className="about">
        <h2 className="about-title">About Us</h2>
        <div className="about-container">
          <div className="about-description">
            <p>
              Carpool Connect is your ultimate carpooling companion, connecting
              riders and drivers for safe, efficient, and eco-friendly travel.
              Whether you're heading to work, a trip, or just around town, our
              platform is here to make your journey hassle-free.
            </p>
            <p>
              Join a community committed to reducing traffic, saving costs, and
              caring for the environment. With Carpool Connect, every trip
              becomes a story worth sharing!
            </p>
          </div>

          <div className="about-video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/csAXruiBLTs?"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainHomePage;
