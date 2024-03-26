import React from "react";
import IntroBox from "../components/IntroBox";
import SectionHeading from "../components/SectionHeading";
import OurWork from "../components/OurWork";
import BannerText from "../components/BannerText";
import SevicesHeading from "../components/SevicesHeading";
import Services from "../components/Services";

const Home = () => {
  return (
    <div>
      <IntroBox />
      <SectionHeading />
      <OurWork />
      <BannerText />
      <SevicesHeading />
      <Services />
      <div>!!</div>
      <div>!!</div>
    </div>
  );
};

export default Home;
