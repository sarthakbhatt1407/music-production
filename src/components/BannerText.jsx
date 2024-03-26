import React from "react";
import styled, { keyframes } from "styled-components";

const MainBox = styled.div`
  width: 80%;
  margin: 0 auto;
  border-radius: 2rem;
  overflow: hidden;
  padding: 3rem 0;
  height: 10vh;
  @media only screen and (min-width: 0px) and (max-width: 350px) {
  }
  @media only screen and (min-width: 351px) and (max-width: 549px) {
    height: 5vh;
    width: 90%;
  }
  @media only screen and (min-width: 550px) and (max-width: 800px) {
  }
`;

const ani = keyframes`
   from { -webkit-transform: translateX(100%); }
  to { -webkit-transform: translateX(-100%); }  
`;

const TextBox = styled.div`
  text-align: right;
  color: #000000b4;

  /* animation properties */
  -moz-transform: translateX(-100%);
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  -moz-animation: ${ani} 10s linear infinite;
  -webkit-animation: ${ani} 10s linear infinite;
  animation: ${ani} 10s linear infinite;
  font-size: 3rem;
  @media only screen and (min-width: 0px) and (max-width: 350px) {
    width: 190vw;
  }
  @media only screen and (min-width: 351px) and (max-width: 549px) {
    font-size: 2.2rem;
    width: 190vw;
  }
  @media only screen and (min-width: 550px) and (max-width: 1200px) {
    font-size: 2.6rem;
    width: 190vw;
  }
`;

const BannerText = () => {
  return (
    <MainBox id="highlights">
      <TextBox>WE MAKE FILMS & DRAMA. SOMETIMES WE WIN AWARDS</TextBox>
    </MainBox>
  );
};

export default BannerText;
