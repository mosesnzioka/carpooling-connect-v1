import React from "react";
import "./home.css";

function Home() {
  return (
    <div className="lagingpage">
      <div className="landingpage-discription">
        <div className="welcoming-user">
          <h2 className="welcome-header">lets save together..</h2>
          <p className="welcoming-description">
            At carpool, we believe every journey is better when shared. Whether
            you're commuting to work, heading to a weekend getaway, or simply
            need a lift, our carpooling system connects you with friendly,
            like-minded people in your community..{" "}
          </p>
          <div className="welcoming-contrals">
            <a className="getstarted-link" href="/signup">
              get started
            </a>
            <a
              className="lets-link"
              href="https://github.com/mosesnzioka"
              target="_blank"
            >
              lets link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
