import React from "react";
import styled from "styled-components";

import ready from "../assets/images/logo/ready.png";
import logo from "../assets/images/logo/logo.png";
import { useNavigate } from "react-router";

const MainDiv = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  height: 70vh;
  display: grid;
  overflow-x: hidden;
  grid-template-columns: 2fr 1fr;
  height: fit-content;
  /* &::before {
    content: "";
    background: url(${(props) => props.ready});
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: -1;
    opacity: 1;
    filter: blur(7px);
    @media only screen and (min-width: 0px) and (max-width: 800px) {
      filter: blur(10px);
    }
  } */
  @media only screen and (min-width: 0px) and (max-width: 800px) {
    grid-template-columns: 1fr;
    padding-bottom: 5rem;
  }
`;
const LeftDiv = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;

  h2 {
    font-size: 3rem;
  }
  p {
    font-size: 1.3rem;
    color: #5c5c5c;
    width: 70%;
  }
  @media only screen and (min-width: 0px) and (max-width: 800px) {
    gap: 0;
    p {
      width: 100%;
      color: #393939;
    }
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const BtnBox = styled.div`
  button {
    font-weight: bold;
    border: 2px solid #828181;
    background-color: transparent;

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
const ReadyToLaunch = () => {
  const navigate = useNavigate();
  return (
    <MainDiv ready={ready}>
      <LeftDiv data-aos="fade-right">
        <h2>Ready to launch?</h2>
        <p>
          Join Rivaaz Films and get discovered for your music and videos on top
          streaming platforms. Reach your fan base in no time with our strong
          distribution network.
        </p>
      </LeftDiv>
      <RightDiv data-aos="fade-left">
        <img src={logo} alt="" />
        <BtnBox>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Start
          </button>
        </BtnBox>
      </RightDiv>
    </MainDiv>
  );
};

export default ReadyToLaunch;
