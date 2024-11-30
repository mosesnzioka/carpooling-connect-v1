import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <a href="/" className="footer-link">
          Home
        </a>
        <a href="/available-pools" className="footer-link">
          Available Pools
        </a>
        <a href="/notifications" className="footer-link">
          Notifications
        </a>
      </nav>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Carpool Connect. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
