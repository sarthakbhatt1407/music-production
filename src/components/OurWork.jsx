import React from "react";
import divider from "../assets/images/divider.svg";
import styled from "styled-components";

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80%;
  margin: 0 auto;
  overflow-x: hidden;
  @media only screen and (min-width: 0px) and (max-width: 350px) {
    width: 90%;
    grid-template-columns: 1fr;
  }
  @media only screen and (min-width: 351px) and (max-width: 549px) {
    width: 90%;
    grid-template-columns: 1fr;
  }
  @media only screen and (min-width: 550px) and (max-width: 800px) {
    grid-template-columns: 1fr;
    width: 90%;
  }
`;

const ImgBox = styled.div`
  img {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: -0.28rem;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  img {
  }
  span {
    font-size: 1rem;
    letter-spacing: 0.09rem;
    color: #0000009c;
  }
  h2 {
    display: flex;

    flex-direction: column;
    span {
      font-size: 3rem;
      color: black;
    }
  }
  @media only screen and (min-width: 0px) and (max-width: 350px) {
    h2 {
      font-size: 2rem;
      margin-top: -0rem;
    }
  }
  @media only screen and (min-width: 351px) and (max-width: 549px) {
    h2 {
      font-size: 2rem;
      margin-top: -0rem;
    }
  }
  @media only screen and (min-width: 550px) and (max-width: 800px) {
  }
`;
const RightDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  p {
    font-size: 1.35rem;
    color: #000000b1;
  }
`;

const OurWork = () => {
  return (
    <MainDiv>
      <LeftDiv data-aos="fade-right">
        <ImgBox>
          <img src={divider} alt="" /> <img src={divider} alt="" />{" "}
          <img src={divider} alt="" /> <img src={divider} alt="" />
        </ImgBox>
        <span>SINCE FROM 2000</span>
        <h2>
          <span>Let’s make great</span>
          <span>something together!</span>
        </h2>
      </LeftDiv>
      <RightDiv data-aos="fade-left">
        <p style={{ textJustify: "inter-word", textAlign: "justify" }}>
          Filmmaking is the process by which a motion picture is produced.
          Filmmaking involves a number of complex & discrete stages, starting
          with an initial story. Our business is one of the largest of its kind
          as an video agency for this good service.
        </p>
      </RightDiv>
    </MainDiv>
  );
};

export default OurWork;
