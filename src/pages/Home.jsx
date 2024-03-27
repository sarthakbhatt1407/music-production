import React from "react";
import IntroBox from "../components/IntroBox";
import SectionHeading from "../components/SectionHeading";
import OurWork from "../components/OurWork";
import BannerText from "../components/BannerText";
import SevicesHeading from "../components/SevicesHeading";
import Services from "../components/Services";
import Faq from "../components/Faq";
import StartWithUS from "../components/StartWithUS";

const Home = () => {
  return (
    <div>
      <IntroBox />
      <SectionHeading />
      <OurWork />
      <BannerText />
      <SevicesHeading data={{ para: "SERVICES", heading: "What We Do" }} />
      <Services />
      <SevicesHeading
        data={{ para: "start with us", heading: "Start Journey" }}
      />
      <StartWithUS />
      <SevicesHeading data={{ para: "queries", heading: "FAQ" }} />
      <Faq />
      <div>!!</div>
      <div>!!</div>
    </div>
  );
};

export default Home;
