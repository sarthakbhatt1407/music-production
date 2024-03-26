import React from "react";
import styled from "styled-components";
import direction from "../assets/images/direction.svg";
import editing from "../assets/images/editing.svg";
import film from "../assets/images/film.svg";
import { Check } from "@mui/icons-material";

const MainBox = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  gap: 2rem;
  flex-wrap: wrap;
`;

const ServiceBox = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  transition: all 0.5s;
  border-radius: 0.2rem;
  width: 26%;
  img {
    transition: all 0.5s;
    width: 5rem;
  }
  h2 {
    font-size: 2.2rem;
  }
  span {
    color: #000000bd;
    font-size: 1.1rem;
  }

  &:hover {
    box-shadow: 0.1rem 0.1rem 0.6rem #00000066;
    img {
      transform: scale(1.1);
    }
    cursor: pointer;
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
  }
`;

const Services = () => {
  const data = [
    {
      key: 1,
      heading: "Video Production",
      img: editing,
      para: "Filmmaking is the process by which a motion picture is produced.",
      points: [
        "Corporate Video",
        "Social Video Making",
        "Tiktok & Youtube Video",
      ],
      aos: "fade-right",
    },
    {
      key: 2,
      heading: "Creative Directions",
      img: direction,
      para: "Filmmaking is the process by which a motion picture is produced.",
      points: [
        "Corporate Video",
        "Social Video Making",
        "Tiktok & Youtube Video",
      ],
      aos: "fade-down",
    },
    {
      key: 3,
      heading: "Promos & Commercial",
      img: film,
      para: "Filmmaking is the process by which a motion picture is produced.",
      points: [
        "Corporate Video",
        "Social Video Making",
        "Tiktok & Youtube Video",
      ],
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
