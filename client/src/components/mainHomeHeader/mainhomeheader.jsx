import "./mainhomeheader.css";
import { Link } from "react-router-dom";
import Logout from "../logout/logout";

function Mainhomeheader() {
  return (
    <div className="home_headings">
      <h2>Carpooling Connect</h2>

      <nav>
        <ul className="authentication-links">
          <li className="navigation-items">
            <Link to="/home" className="navigation-link">
              Home
            </Link>
          </li>
          <li className="navigation-items">
            <Link to="/allpools" className="navigation-link">
              available pools
            </Link>
          </li>
          <li className="navigation-items">
            <Link to="/createpool" className="navigation-link">
              Create Pool
            </Link>
          </li>
          <li className="navigation-items">
            <Link to="/myprofile" className="navigation-link">
              my profile
            </Link>
          </li>
          <li className="navigation-items">
            <Link to="/mypools" className="navigation-link">
              my pools
            </Link>
          </li>
          <li className="navigation-items">
            <Link to="/notifications" className="navigation-link">
              Notifications
            </Link>
          </li>
        </ul>
      </nav>
      <Logout />
    </div>
  );
}

export default Mainhomeheader;
