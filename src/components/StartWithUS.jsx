import styled from "@emotion/styled";
import React, { useState } from "react";
import signup from "../assets/images/signup.png";
import music from "../assets/images/music.png";
import dis from "../assets/images/dis.png";
import earn from "../assets/images/earn.png";

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80%;
  margin: 0 auto;
  grid-gap: 3rem;
  padding: 2rem 1rem;
  height: 80vh;
  /* background-color: red; */
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  overflow: hidden;
  height: 100%;
`;

const LeftDivTextBox = styled.div`
  cursor: pointer;
  background-color: #2a2a2a;
  color: white;
  display: flex;
  height: 25%;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  transition: all 0.4s;
  padding: 1rem 3rem;
  &:not(:last-child) {
    margin-bottom: 0.1rem;
  }

  h2 {
    margin: -0rem;
    font-size: 1.4rem;
    transition: all 0.2s;
    text-transform: uppercase;
  }
  span {
    font-size: 0.9rem;
    color: #a7a7a7;
  }
`;

const RightDiv = styled.div`
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  img {
    width: 30rem;
  }
  height: 100%;
`;

const StartWithUS = () => {
  const [active, setActive] = useState("1");
  const activeHandler = (act) => {
    setActive(act);
  };
  return (
    <MainDiv>
      <LeftDiv>
        <LeftDivTextBox
          onClick={activeHandler.bind(this, "1")}
          style={{
            transform: active == 1 ? "scale(1.02)" : "scale(1)",
            backgroundColor: active == 1 ? "#434343" : "#2a2a2a",
          }}
        >
          <h2 style={{ color: active == "1" ? "#ff500a" : "white" }}>
            Register with us
          </h2>
          <span>Begin your musical journey with Rivaaz Films.</span>
        </LeftDivTextBox>

        <LeftDivTextBox
          onClick={activeHandler.bind(this, "2")}
          style={{
            transform: active == 2 ? "scale(1.02)" : "scale(1)",
            backgroundColor: active == 2 ? "#434343" : "#2a2a2a",
          }}
        >
          <h2 style={{ color: active == "2" ? "#ff500a" : "white" }}>
            Upload Your Music
          </h2>
          <span> Share your tracks, albums, or singles effortlessly</span>
        </LeftDivTextBox>

        <LeftDivTextBox
          onClick={activeHandler.bind(this, "3")}
          style={{
            transform: active == 3 ? "scale(1.02)" : "scale(1)",
            backgroundColor: active == 3 ? "#434343" : "#2a2a2a",
          }}
        >
          <h2 style={{ color: active == "3" ? "#ff500a" : "white" }}>
            Distribute Worldwide
          </h2>
          <span>
            Amplify your reach globally as we take charge of distributing your
            music through our extensive network.
          </span>
        </LeftDivTextBox>

        <LeftDivTextBox
          onClick={activeHandler.bind(this, "4")}
          style={{
            transform: active == 4 ? "scale(1.02)" : "scale(1)",
            backgroundColor: active == 4 ? "#434343" : "#2a2a2a",
          }}
        >
          <h2 style={{ color: active == "4" ? "#ff500a" : "white" }}>
            Receive Earnings
          </h2>
          <span>
            Monitor your success through our transparent earnings reporting
            system, and celebrate the recognition your music deserves.
          </span>
        </LeftDivTextBox>
      </LeftDiv>
      <RightDiv>
        {active == 1 && <img src={signup} alt="" data-aos="zoom-in" />}
        {active == 2 && <img src={music} alt="" data-aos="zoom-in" />}
        {active == 3 && <img src={dis} alt="" data-aos="zoom-in" />}
        {active == 4 && <img src={earn} alt="" data-aos="zoom-in" />}
      </RightDiv>
    </MainDiv>
  );
};

export default StartWithUS;
