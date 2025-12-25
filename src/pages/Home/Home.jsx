import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import About from "./About";
import Packages from "./Packages";
import Testimonials from "./Testimonials";
import Industries from "./Industries";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>AssetVerse | Home</title>
      </Helmet>

      <Banner />
      <Industries />
      <About />
      <Packages />
      <Testimonials />
    </div>
  );
};

export default Home;
