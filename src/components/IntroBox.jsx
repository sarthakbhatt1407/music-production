import React from "react";
import styled from "styled-components";
import intro from "../assets/images/intro.jpg";

const MainBox = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    background: url(${(props) => props.intro});
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    opacity: 0.9;
  }
`;
const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  color: white;
  background-color: rgba(0, 0, 0, 0.01);
  padding: 2rem 0;
  height: 40%;
  opacity: 1;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    h1 {
      font-size: 7rem;
      text-align: center;
    }
    h2 {
      font-size: 7rem;
    }
  }
`;

const Para = styled.span`
  margin-top: -8rem;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
`;
const BtnBox = styled.div`
  button {
    border: 2px solid white;
    background-color: transparent;

    color: white;
    overflow: hidden;
    padding: 0.7rem 2rem;
    position: relative;
    text-decoration: none;
    transition: 0.2s transform ease-in-out;
    will-change: transform;
    z-index: 0;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    font-size: 0.8rem;
    &::after {
      background-color: white;

      content: "";
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(-100%, 0) rotate(10deg);
      transform-origin: top left;
      transition: 0.2s transform ease-out;
      will-change: transform;
      z-index: -1;
    }
    &:hover::after {
      transform: translate(0, 0);
    }
    &:hover {
      border: 2px solid transparent;
      color: black;
      transform: scale(1.05);
      font-weight: 500;
      will-change: transform;
    }
  }
`;
const IntroBox = () => {
  return (
    <MainBox intro={intro}>
      <TextBox>
        <div>
          <h1 data-aos="fade-up">Nm </h1>
          <h2 data-aos="fade-down">Digital</h2>
        </div>
        <div>
          <Para data-aos="fade-right">a mordern solution</Para>
          <Para data-aos="fade-left">for video production</Para>
        </div>
        <BtnBox>
          <button>view more</button>
        </BtnBox>
      </TextBox>
    </MainBox>
  );
};

export default IntroBox;
