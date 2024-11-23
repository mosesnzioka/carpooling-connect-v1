

import "./homeheader.css";

function LandingHeaderNavs() {
  return (
    <div className="landing_headings">
      <h2>Carpooling</h2>
      <nav>
        <ul className="authentication-links">
          <li className="navigation-items">
            <a href="/signin" className="navigation-link">
              Sign In
            </a>
          </li>
          <li className="navigation-items">
            <a href="/signup" className="navigation-link">
              Sign Up
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingHeaderNavs;
