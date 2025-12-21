import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import About from "./About";
import Packages from "./Packages";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>AssetVerse | Home</title>
      </Helmet>

      <Banner />
      <About />
      <Packages />
      <Testimonials />
    </div>
  );
};

export default Home;
