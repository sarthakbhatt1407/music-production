import React from "react";
import styled from "styled-components";
import intro from "../assets/images/intro.jpg";

const MainBox = styled.div`
  height: 98vh;
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
    opacity: 1;
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
  @media only screen and (min-width: 0px) and (max-width: 549px) {
    div {
      width: 100%;
      gap: 0.5rem;
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
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  @media only screen and (min-width: 0px) and (max-width: 350px) {
    font-size: 0.8rem;
    margin-top: -4rem;
  }
  @media only screen and (min-width: 351px) and (max-width: 549px) {
    font-size: 1.05rem;
    margin-top: -4rem;
  }
  @media only screen and (min-width: 550px) and (max-width: 800px) {
    font-size: 1.5rem;
    margin-top: -5rem;
  }
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
    <MainBox intro={intro}>
      <TextBox>
        <div>
          <h1 data-aos="fade-up">Rivaz </h1>
          <h2 data-aos="fade-down">Films</h2>
        </div>
        <div>
          <Para data-aos="fade-right">a mordern solution</Para>
          <Para data-aos="fade-left">for video production</Para>
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
