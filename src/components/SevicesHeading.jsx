import React from "react";
import styled from "styled-components";
import divider from "../assets/images/divider.svg";

const MainBox = styled.div`
  display: flex;
  padding: 3rem 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    color: #000000af;
  }
  h2 {
    font-size: 3rem;
    margin-top: -0rem;
    letter-spacing: 0.2rem;
  }
`;
const ImgBox = styled.div`
  img {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: -0.28rem;
  }
`;

const SevicesHeading = () => {
  return (
    <MainBox>
      <ImgBox data-aos="zoom-in">
        <img src={divider} alt="" /> <img src={divider} alt="" />{" "}
        <img src={divider} alt="" /> <img src={divider} alt="" />
      </ImgBox>
      <span data-aos="fade-left">Services</span>
      <h2 data-aos="fade-right">What We Do</h2>
    </MainBox>
  );
};

export default SevicesHeading;
