import React from "react";
import IntroBox from "../components/IntroBox";
import SectionHeading from "../components/SectionHeading";
import OurWork from "../components/OurWork";
import BannerText from "../components/BannerText";
import SevicesHeading from "../components/SevicesHeading";
import Services from "../components/Services";
// import Faq from "../components/Faq";
import StartWithUS from "../components/StartWithUS";
import ContactsUs from "../components/ContactsUs";
import ReadyToLaunch from "../components/ReadyToLaunch";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <IntroBox />
      <SectionHeading />
      <OurWork />
      <BannerText />
      <SevicesHeading data={{ para: "SERVICES", heading: "What We Do" }} />
      <Services />
      <SevicesHeading data={{ para: "Get in touch", heading: "Contact Us" }} />
      <ContactsUs />{" "}
      <SevicesHeading
        data={{ para: "start with us", heading: "Start Journey" }}
      />
      <StartWithUS />
      <ReadyToLaunch />
      {/* <SevicesHeading data={{ para: "queries", heading: "FAQ" }} />
      <Faq /> */}
      <Footer />
    </div>
  );
};

export default Home;
