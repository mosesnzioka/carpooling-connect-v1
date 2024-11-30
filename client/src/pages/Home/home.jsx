import Home from "../../components/Home/home";
import LandingHeaderNavs from "../../components/HomeHeader/homeheader";
import Footer from "../../components/footer/footer";
import React from "react";

function HomePage() {
  return (
    <div>
      <LandingHeaderNavs />
      <Home />
      <Footer />
    </div>
  );
}

export default HomePage;
