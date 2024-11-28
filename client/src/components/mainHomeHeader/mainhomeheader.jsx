import "./mainhomeheader.css"
import Logout from "../logout/logout";

function Mainhomeheader() {
  return (
    <div className="home_headings">
      <h2>Carpooling Connect</h2>
     
      <nav>
        <ul className="authentication-links">
        <li className="navigation-items">
            <a href="/home" className="navigation-link">
              Home
            </a>
          </li>
          <li className="navigation-items">
            <a href="/allpools" className="navigation-link">
              available pools
            </a>
          </li>
          <li className="navigation-items">
            <a href="/createpool" className="navigation-link">
              Create Pool
            </a>
          </li>
          <li className="navigation-items">
            <a href="#" className="navigation-link">
              my profile
            </a>
          </li>
          <li className="navigation-items">
            <a href="requests" className="navigation-link">
              Requests
            </a>
          </li>

           
        </ul>
      </nav>
      <Logout/>

      
      
    </div>
  );
}

export default Mainhomeheader;