import React from "react";
import styled from "styled-components";

const MainBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem 0;
  @media only screen and (min-width: 0px) and (max-width: 350px) {
    padding: 3rem 0;
  }
  @media only screen and (min-width: 351px) and (max-width: 549px) {
    padding: 3rem 0;
  }
  @media only screen and (min-width: 550px) and (max-width: 800px) {
    padding: 3rem 0;
  }
`;

const TextBox = styled.div`
  display: flex;
  gap: 0.5rem;
  span {
    font-size: 1.5rem;
    text-transform: uppercase;
    color: #00000092;
    letter-spacing: 0.09rem;
  }
  h2 {
    font-size: 3.5rem;
    margin-top: -0.1rem;
    letter-spacing: 0.1rem;
  }
  @media only screen and (min-width: 0px) and (max-width: 350px) {
    span {
      font-size: 0.8rem;
    }
    h2 {
      font-size: 1.7rem;
    }
  }
  @media only screen and (min-width: 351px) and (max-width: 549px) {
    span {
      font-size: 1rem;
    }
    h2 {
      font-size: 2rem;
    }
  }
  @media only screen and (min-width: 550px) and (max-width: 800px) {
    span {
      font-size: 1.3rem;
    }
    h2 {
      font-size: 2.3rem;
    }
  }
`;

const SectionHeading = () => {
  return (
    <MainBox>
      <TextBox>
        <span data-aos="zoom-in" data-aos-delay="700">
          stunning homepage collection
        </span>
      </TextBox>
      <TextBox>
        <h2 data-aos="fade-up">LIGHTS, </h2>
        <h2 data-aos="fade-down">CAMERA, </h2>
        <h2 data-aos="fade-up">ACTION!</h2>
      </TextBox>
    </MainBox>
  );
};

export default SectionHeading;
