import { Avatar, Rating } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import random from "../assets/images/random.webp";

const OuterBox = styled.div`
  position: relative;
`;

const MainBox = styled.div`
  width: 85%;
  height: 50vh;
  margin: auto;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (min-width: 251px) and (max-width: 949px) {
    height: 60vh;
    width: 95%;
  }
`;

const ImgBox = styled.div`
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 1s;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media only screen and (min-width: 251px) and (max-width: 949px) {
    gap: 1rem;
  }
`;
const ReviewBox = styled.div`
  border-radius: 0.4rem;
  /* background-color: #f4f4f4; */
  box-shadow: 0.1rem 0.1rem 0.6rem #eeeeee6b;
  height: fit-content;
  padding: 2rem 1rem;
  span {
    color: #d91b01;
    transform: scale(1.1);
  }
  p {
    width: 80%;
  }
  @media only screen and (min-width: 251px) and (max-width: 949px) {
    padding: 1rem 0.5rem;
    p {
      width: 100%;
    }
  }
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: start;
  gap: 1rem;
  align-items: center;
  span {
    color: black;
    font-size: 1.4rem;
  }
  @media only screen and (min-width: 251px) and (max-width: 949px) {
    gap: 0.7rem;
    span {
      font-size: 1.2rem;
    }
  }
`;

const Clients = (props) => {
  const imageLeft = () => {
    const images = document.querySelectorAll(".image");

    images.forEach((slide, ind) => {
      slide.style.left = `${ind * 100}%`;
    });
  };
  setTimeout(() => {
    imageLeft();
  }, 1);
  const slider = () => {
    const images = document.querySelectorAll(".image");
    images.forEach((slide) => {
      slide.style.transform = `translateX(-${current * 100}%)`;
    });
  };

  let current = 0;
  //   const prev = () => {
  //     const images = document.querySelectorAll(".image");
  //     if (current > 0) {
  //       current--;
  //       slider();
  //     } else {
  //       current = images.length - 1;
  //       slider();
  //     }
  //   };

  const next = () => {
    const images = document.querySelectorAll(".image");

    if (current < images.length - 1) {
      current++;
      slider();
    } else {
      current = 0;
      slider();
    }
  };

  useEffect(() => {
    const intv = setInterval(() => {
      next();
    }, 2500);
    return () => {
      clearInterval(intv);
    };
  });

  return (
    <OuterBox>
      {/* data-aos="fade-right" */}
      <MainBox>
        <ImgBox className="image">
          <ReviewBox>
            <Rating name="read-only" value={5} readOnly />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              deserunt vero nam totam doloremque excepturi aut voluptas! Sunt,
              eaque tenetur?
            </p>
            <ProfileBox>
              <Avatar alt="Remy Sharp" src={random} />
              <span>Sarthak Bhatt</span>
            </ProfileBox>
          </ReviewBox>
          <ReviewBox>
            <Rating name="read-only" value={5} readOnly />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              deserunt vero nam totam doloremque excepturi aut voluptas! Sunt,
              eaque tenetur?
            </p>
            <ProfileBox>
              <Avatar alt="Remy Sharp" src={random} />
              <span>Sarthak Bhatt</span>
            </ProfileBox>
          </ReviewBox>
        </ImgBox>
        <ImgBox className="image">
          <ReviewBox>
            <Rating name="read-only" value={5} readOnly />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              deserunt vero nam totam doloremque excepturi aut voluptas! Sunt,
              eaque tenetur?
            </p>
            <ProfileBox>
              <Avatar alt="Remy Sharp" src={random} />
              <span>Sarthak Bhatt</span>
            </ProfileBox>
          </ReviewBox>
          <ReviewBox>
            <Rating name="read-only" value={5} readOnly />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              deserunt vero nam totam doloremque excepturi aut voluptas! Sunt,
              eaque tenetur?
            </p>
            <ProfileBox>
              <Avatar alt="Remy Sharp" src={random} />
              <span>Sarthak Bhatt</span>
            </ProfileBox>
          </ReviewBox>
        </ImgBox>
        <ImgBox className="image">
          <ReviewBox>
            <Rating name="read-only" value={5} readOnly />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              deserunt vero nam totam doloremque excepturi aut voluptas! Sunt,
              eaque tenetur?
            </p>
            <ProfileBox>
              <Avatar alt="Remy Sharp" src={random} />
              <span>Sarthak Bhatt</span>
            </ProfileBox>
          </ReviewBox>
          <ReviewBox>
            <Rating name="read-only" value={5} readOnly />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              deserunt vero nam totam doloremque excepturi aut voluptas! Sunt,
              eaque tenetur?
            </p>
            <ProfileBox>
              <Avatar alt="Remy Sharp" src={random} />
              <span>Sarthak Bhatt</span>
            </ProfileBox>
          </ReviewBox>
        </ImgBox>
        <ImgBox className="image">
          <ReviewBox>
            <Rating name="read-only" value={5} readOnly />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              deserunt vero nam totam doloremque excepturi aut voluptas! Sunt,
              eaque tenetur?
            </p>
            <ProfileBox>
              <Avatar alt="Remy Sharp" src={random} />
              <span>Sarthak Bhatt</span>
            </ProfileBox>
          </ReviewBox>
          <ReviewBox>
            <Rating name="read-only" value={5} readOnly />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              deserunt vero nam totam doloremque excepturi aut voluptas! Sunt,
              eaque tenetur?
            </p>
            <ProfileBox>
              <Avatar alt="Remy Sharp" src={random} />
              <span>Sarthak Bhatt</span>
            </ProfileBox>
          </ReviewBox>
        </ImgBox>
        {/*  */}
      </MainBox>
    </OuterBox>
  );
};

export default Clients;
