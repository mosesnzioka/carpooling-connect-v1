import Home from "../../components/Home/home";
import LandingHeaderNavs from "../../components/HomeHeader/homeheader";
import Footer from "../../components/footer/footer";
import React from "react";

function HomePage() {
  return (
    <div>
      <LandingHeaderNavs />
      <Home />
    </div>
  );
}

export default HomePage;
