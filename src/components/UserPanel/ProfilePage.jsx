import React from "react";
import { Breadcrumb } from "antd";
import styled from "@emotion/styled";
import random from "../../assets/images/random.webp";
import { ContentCopyOutlined } from "@mui/icons-material";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  gap: 0.7rem;
  h1 {
    margin: 0;
    margin-bottom: 1rem;
  }
  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
`;

const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  padding: 1rem;
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.5rem;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    padding: 0;
    background-color: transparent;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: hidden;
  border-radius: 0.5rem;
  gap: 1rem;
  img {
    width: 100%;
    margin: 0 auto;
    border-radius: 0.5rem;
  }
  div {
    display: flex;
    /* background-color: red; */
    width: 100%;

    span {
      width: 50%;
      letter-spacing: 0.09rem;
      text-transform: capitalize;
      &:first-child {
        margin-right: 0.8rem;
      }
      &:not(:first-child) {
        margin-left: 0.8rem;
      }
      padding: 0.5rem 0.6rem 0.5rem 0.2rem;
      font-size: 1.2rem;
      border-bottom: 1px solid #dadada;
    }
  }
  @media only screen and (max-width: 1000px) {
    padding: 0rem 0rem 0.4rem 0rem;
    background-color: white;
    img {
    }
    div {
      padding: 0 0.2rem;
      span {
        font-size: 1rem;
        padding: 0.5rem 0;
        letter-spacing: 0;
      }
    }
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;

  div {
    background-color: white;

    &:first-child {
      border-radius: 0.5rem;
      height: 100%;
    }
    padding: 1rem;
    p {
      text-transform: capitalize;
      border-bottom: 1px solid #e7e7ee;
      font-size: 1.3rem;
      margin: 0.5rem 0;
      padding: 0.6rem 0.4rem;

      color: black;
      font-weight: 500;
    }
    div {
      display: flex;
      justify-content: space-between;

      span {
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.2rem 0;
        &:not(:first-child) {
          color: black;
          font-weight: 500;
          text-transform: uppercase;
        }
      }
    }
  }
`;

const ProfilePage = () => {
  const copyToClipBoard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);

      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <MainDiv>
      <Breadcrumb
        items={[
          {
            title: "User Panel",
          },
          {
            title: "Profile",
          },
        ]}
      />
      <h1>My Account</h1>
      <ContentDiv>
        <LeftDiv>
          <img src={random} alt="" />
          <div>
            <span>Sarthak Bhatt</span>
            <span>+91-1234567890</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                width: "100%",
                padding: "0.5rem 2rem 0.5rem 0.2rem",
                margin: "0 0 0 0",
                textTransform: "none",
              }}
            >
              s@gmail.com
            </span>
          </div>
        </LeftDiv>
        <RightDiv>
          <div style={{ boxShadow: " 0.2rem 0.2rem 1rem #d8d8d8" }}>
            <p>Details</p>
            <div>
              <span>Name</span>
              <span>Sarthak Bhatt</span>
            </div>
            <div>
              <span>Email</span>
              <span style={{ textTransform: "none" }}>s@gmail.com</span>
            </div>
            <div>
              <span>Phone</span>
              <span>+91-1234567890</span>
            </div>
            <div>
              <span>City</span>
              <span>Dehradun</span>
            </div>
            <div>
              <span>State</span>
              <span>Uttarakhand</span>
            </div>
            <div>
              <span>Country</span>
              <span>India</span>
            </div>
          </div>
        </RightDiv>
        <RightDiv>
          <div style={{ boxShadow: " 0.2rem 0.2rem 1rem #d8d8d8" }}>
            <p>Bank</p>
            <div>
              <span>Account No.</span>
              <span>
                454515454848
                <ContentCopyOutlined
                  style={{ cursor: "pointer", transform: "scale(.8)" }}
                  onClick={copyToClipBoard.bind(this, "454515454848")}
                />
              </span>
            </div>
            <div>
              <span>IFSC</span>
              <span>
                HDFC00005144
                <ContentCopyOutlined
                  style={{ cursor: "pointer", transform: "scale(.8)" }}
                  onClick={copyToClipBoard.bind(this, "HDFC00005144")}
                />
              </span>
            </div>
            <div>
              <span>Bank Name</span>
              <span>HDFC</span>
            </div>
            <div>
              <span>UPI</span>
              <span style={{ textTransform: "none" }}>
                751649898@paytm
                <ContentCopyOutlined
                  style={{ cursor: "pointer", transform: "scale(.8)" }}
                  onClick={copyToClipBoard.bind(this, "751649898@paytm")}
                />
              </span>
            </div>
          </div>
        </RightDiv>
      </ContentDiv>
    </MainDiv>
  );
};

export default ProfilePage;
