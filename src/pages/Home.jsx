import React, { useState } from "react";
import IntroBox from "../components/IntroBox";
import SectionHeading from "../components/SectionHeading";
import OurWork from "../components/OurWork";
import BannerText from "../components/BannerText";
import SevicesHeading from "../components/SevicesHeading";
import Services from "../components/Services";
import StartWithUS from "../components/StartWithUS";
import { PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import ContactsUs from "../components/ContactsUs";
import ReadyToLaunch from "../components/ReadyToLaunch";
import Footer from "../components/Footer";
import Clients from "../components/Clients";
import WebNav from "../components/Navbars/WebNav";

const Home = () => {
  const [open, setOpen] = useState(false);
  const onChange = (checked) => {
    setOpen(!open);
  };
  return (
    <>
      <WebNav />
      {/* 
      <FloatButton.Group
        open={open}
        onClick={onChange}
        trigger="click"
        style={{
          right: 30,
          transform: "scale(1.5)",
          zIndex: 1,
        }}
        tooltip={<div>Contact us</div>}
        icon={<PhoneOutlined />}
      >
        <FloatButton
          onClick={() => {
            window.open("tel:+918384864363", "_blank");
            setOpen(!open);
          }}
          tooltip={<div>Phone</div>}
          icon={
            <PhoneOutlined
              style={{
                color: "#2178e9e0",
              }}
            />
          }
        />
        <FloatButton
          style={{}}
          onClick={() => {
            window.open("https://wa.me/+918126770620", "_blank");
            setOpen(!open);
          }}
          tooltip={<div>Whatsapp</div>}
          icon={
            <WhatsAppOutlined
              style={{
                color: "#50CC5E",
              }}
            />
          }
        />
      </FloatButton.Group> */}

      <div>
        <IntroBox />
        <SectionHeading />
        <OurWork />
        <BannerText />
        <SevicesHeading data={{ para: "SERVICES", heading: "What We Do" }} />
        <Services />
        <SevicesHeading
          data={{ para: "WHAT Artists SAYS", heading: "Artists" }}
        />
        <Clients />
        <SevicesHeading
          data={{ para: "start with us", heading: "Start Journey" }}
        />
        <StartWithUS />
        <ReadyToLaunch />{" "}
        <SevicesHeading
          data={{ para: "Get in touch", heading: "Contact Us" }}
        />
        <ContactsUs />
        {/* <SevicesHeading data={{ para: "queries", heading: "FAQ" }} />
      <Faq /> */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
