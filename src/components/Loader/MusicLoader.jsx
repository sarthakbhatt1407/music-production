import React from "react";
import styled from "styled-components";
import "./MusicLoader.css";

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff79;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const MusicLoader = () => {
  return (
    <MainBox>
      <div className="spinner">
        <div className="r1"></div>
        <div className="r2"></div>
        <div className="r3"></div>
        <div className="r4"></div>
        <div className="r5"></div>
      </div>
    </MainBox>
  );
};

export default MusicLoader;
