import React from "react";
import styled from "styled-components";
import direction from "../assets/images/direction.svg";
import editing from "../assets/images/editing.svg";
import film from "../assets/images/film.svg";
import lyrics from "../assets/images/lyrics.svg";
import { Check } from "@mui/icons-material";

const MainBox = styled.div`
  display: flex;
  width: 87%;
  margin: 0 auto;
  gap: 1rem;
  overflow: hidden;
  flex-wrap: wrap;
  padding: 1rem;
  flex-wrap: nowrap;
  /* background-color: red; */
  justify-content: space-around;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    flex-wrap: wrap;
  }
`;

const ServiceBox = styled.div`
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  transition: all 0.5s;
  border-radius: 0.4rem;
  /* border: 1px dashed #e7e7e7; */
  width: 25%;
  img {
    transition: all 0.5s;
    width: 5rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  span {
    color: #000000bd;
    font-size: 1.1rem;
  }

  &:hover {
    box-shadow: 0.1rem 0.1rem 0.6rem #00000059;
    /* border: none; */
    img {
      transform: scale(1.1);
    }
    cursor: pointer;
  }
  @media only screen and (min-width: 0px) and (max-width: 350px) {
    width: 90%;
  }
  @media only screen and (min-width: 351px) and (max-width: 549px) {
    width: 90%;
  }
  @media only screen and (min-width: 550px) and (max-width: 1000px) {
    margin: 0 auto;
    width: fit-content;
  }
`;
const PointsBox = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  span {
    display: flex;
    align-items: center;
    color: black;
    gap: 0.4rem;
  }
`;

const Services = () => {
  const data = [
    {
      key: 1,
      heading: "Music Distribution",
      img: editing,
      para: "From Spotify to Apple Music, we navigate the intricacies of distribution.",
      points: [
        "Global Music Distribution",
        "Youtube Content ID And Monetization",
        "Account Management & Support",
      ],
      aos: "fade-right",
    },
    {
      key: 2,
      heading: "Video Distribution",
      img: direction,
      para: "Elevate your content's visibility with our top-tier Video Distribution Services.",
      points: [
        "Multi-Platform Distribution",
        "Social Video Making",
        "Cross-Platform Consistency",
      ],
      aos: "fade-down",
    },
    {
      key: 3,
      heading: "Music Publishing",
      img: film,
      para: "Our music publishing services provide invaluable expertise in copyright protection.",
      points: [
        "Performing Royalties",
        "Mechanical Royalties",
        "Sync Licensing Royalties",
      ],
      aos: "fade-up",
    },
    {
      key: 3,
      heading: "Lyrics Distribution ",
      img: lyrics,
      para: "From streaming services to online lyrics databases, ensure your words resonate with a global audience.",
      points: ["Global Reach", "Platform Diversity", "Real-time Updates"],
      aos: "fade-left",
    },
  ];

  return (
    <MainBox id="services">
      {data.map((item) => {
        return (
          <ServiceBox key={item.key} data-aos={item.aos}>
            <img src={item.img} alt="" />
            <h2>{item.heading}</h2>
            <span>{item.para}</span>

            <PointsBox>
              {item.points.map((p) => {
                return (
                  <span key={p}>
                    <Check
                      style={{ color: "orange", transform: "scale(.8)" }}
                    />
                    {p}
                  </span>
                );
              })}
            </PointsBox>
          </ServiceBox>
        );
      })}
    </MainBox>
  );
};

export default Services;
