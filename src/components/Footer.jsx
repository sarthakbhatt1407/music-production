import React from "react";
import styled from "styled-components";
import logo from "../assets/images/logo/logo.webp";
import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  LocationCity,
  Mail,
  Phone,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  background-color: #f7f7f7a7;
  margin-top: 2rem;
  @media only screen and (min-width: 351px) and (max-width: 950px) {
    margin-top: 6rem;
  }
`;

const FirstDiv = styled.div`
  /* background-color: red; */
  width: 80%;
  margin: 0 auto;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  gap: 2rem;
  @media only screen and (min-width: 351px) and (max-width: 950px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }
`;

const LeftDiv = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  /* background-color: red; */
  gap: 1rem;
  img {
    width: 14rem;
  }
  div {
    display: flex;
    gap: 1.5rem;
    justify-content: start;
    align-items: center;
    width: 100%;
    padding: 1rem 0.2rem;
    svg {
      transform: scale(1.7);
    }
  }
  @media only screen and (min-width: 351px) and (max-width: 950px) {
    div {
      justify-content: center;
      align-items: center;
      gap: 1.8rem;
    }
  }
`;

const MidDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: red; */

  h2 {
    font-size: 2.4rem;
    text-transform: capitalize;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
    width: 70%;
    gap: 1rem;
    font-size: 1.3rem;
    text-transform: capitalize;
    span {
      cursor: pointer;
      transition: all 0.4s;
      color: black;
      a {
        text-decoration: none;
        color: black;
        &:hover {
          color: #d61c01;
        }
      }
      &:hover {
        color: #d61c01;
        transform: scale(1.1);
      }
    }
  }
`;

// const RightDiv = styled.div``;

const SecondDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 1rem 2rem;
  text-align: center;
`;

const Footer = () => {
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
  return (
    <MainDiv>
      <FirstDiv>
        <LeftDiv>
          <img src={logo} alt="" />
          <div>
            <Link>
              <FacebookOutlined
                style={{
                  color: "#3338A3",
                }}
              />
            </Link>
            <Link>
              <Instagram
                style={{
                  color: "#F77D41",
                }}
              />
            </Link>
            <Link>
              <YouTube
                style={{
                  color: "#ff0015",
                }}
              />
            </Link>
            <Link>
              <LinkedIn
                style={{
                  color: "#114B84",
                }}
              />
            </Link>
            <Link>
              <Twitter
                style={{
                  color: "#55ACEE",
                }}
              />
            </Link>
          </div>
        </LeftDiv>
        <MidDiv>
          <h2>Quick links</h2>
          <div>
            <span onClick={scrollToSection.bind(this, "overview")}>
              Overview
            </span>
            <span onClick={scrollToSection.bind(this, "services")}>
              services
            </span>

            <span onClick={scrollToSection.bind(this, "contact-us")}>
              contact us
            </span>
            <span onClick={scrollToSection.bind(this, "startwithus")}>
              start with us
            </span>
          </div>
        </MidDiv>
        <MidDiv>
          <h2>Get In touch</h2>
          <div>
            <span>
              <Phone /> +918126770620 +918384864366
            </span>
            <span style={{ textTransform: "none" }}>
              <Mail /> s@gmail.com
            </span>

            <span style={{ textAlign: "center" }}>
              <Link
                target="_blank"
                to={"https://maps.app.goo.gl/UdjjYDiC6edBfuwP6"}
              >
                <LocationCity /> Tarun Vihar Lane 4, mothrowala road,
                banjarawla, near sidheshwar temple.
              </Link>
            </span>
          </div>
        </MidDiv>
      </FirstDiv>
      <SecondDiv>
        <p>Copyright © 2024 Rivaaz Films. All rights reserved.</p>
      </SecondDiv>
    </MainDiv>
  );
};

export default Footer;
