import React from "react";
import styled from "styled-components";
import intro from "../assets/images/intro.webp";
import introMobile from "../assets/images/introMobile.webp";

const MainBox = styled.div`
  height: 98vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  z-index: 10;
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
    opacity: 1;
    filter: blur(3px);
    @media only screen and (min-width: 0px) and (max-width: 549px) {
      background: url(${(props) => props.introMobile});
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 110%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      z-index: -1;
      opacity: 1;
      filter: blur(3px);
    }
  }
`;
const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  color: black;
  padding: 2rem 4rem;
  height: 30%;
  opacity: 1;
  gap: 1rem;
  div {
    width: 100%;
    display: flex;
    justify-content: start;
    height: 100%;
    align-items: center;
    gap: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    padding: 2rem 0;
    h1 {
      font-size: 8rem;
      text-align: center;
    }
    h2 {
      font-size: 8rem;
      color: #d91903;
    }
  }
  @media only screen and (min-width: 0px) and (max-width: 549px) {
    margin-bottom: 2rem;
    div {
      padding: 0 0.2rem;
      width: 100%;
      gap: 0.5rem;
      justify-content: center;
      padding: 0;

      h1 {
        font-size: 4rem;
      }
      h2 {
        font-size: 4rem;
      }
    }
  }
  @media only screen and (min-width: 550px) and (max-width: 800px) {
    div {
      width: 100%;
      gap: 0.5rem;
      h1 {
        font-size: 4.5rem;
      }
      h2 {
        font-size: 4.5rem;
      }
    }
  }
`;

const Para = styled.span`
  margin-top: -8rem;
  font-size: 1.8rem;
  text-transform: capitalize;
  letter-spacing: 0.1rem;
  color: black;
  &:last-child {
    color: #d91903;
  }
  @media only screen and (min-width: 0px) and (max-width: 350px) {
    font-size: 0.8rem;
    margin-top: -4rem;
  }
  @media only screen and (min-width: 351px) and (max-width: 549px) {
    font-size: 1.3rem;
    margin-top: -5rem;
    letter-spacing: 0;
    font-weight: bold;
  }
  @media only screen and (min-width: 550px) and (max-width: 800px) {
    font-size: 1.5rem;
    margin-top: -5rem;
  }
`;
const BtnBox = styled.div`
  button {
    font-weight: bold;
    border: 2px solid #828181;
    background-color: transparent;
    margin-top: -5rem;
    color: black;
    overflow: hidden;
    padding: 0.7rem 2rem;
    position: relative;
    text-decoration: none;
    transition: 0.2s transform ease-in-out;
    will-change: transform;
    z-index: 0;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    font-size: 0.9rem;
    &::after {
      background-color: #d61a07;

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
      color: white;
      transform: scale(1.05);
      font-weight: 500;
      will-change: transform;
    }
    @media only screen and (min-width: 0px) and (max-width: 549px) {
      margin: 0;
    }
  }
`;
const scrollToSection = (sectionId) => {
  const sectionElement = document.getElementById(sectionId);
  const offset = 128;
  if (sectionElement) {
    const targetScroll = sectionElement.offsetTop - offset;
    sectionElement.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }
};
const IntroBox = () => {
  return (
    <MainBox id="intro" intro={intro} introMobile={introMobile}>
      <TextBox>
        <div>
          <h1 data-aos="fade-up">Rivaaz </h1>
          <h2 data-aos="fade-down">Films</h2>
        </div>
        <div>
          <Para data-aos="fade-right">a mordern solution for</Para>
          <Para data-aos="fade-left">music distribution</Para>
        </div>

        <BtnBox>
          <button
            data-aos="fade-up"
            onClick={scrollToSection.bind(this, "overview")}
          >
            view more
          </button>
        </BtnBox>
      </TextBox>
    </MainBox>
  );
};

export default IntroBox;
