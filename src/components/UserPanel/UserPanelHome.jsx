import styled from "@emotion/styled";
import {
  AccountBalanceOutlined,
  CurrencyRupeeOutlined,
} from "@mui/icons-material";
import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
  Rectangle,
  Pie,
  PieChart,
  Cell,
} from "recharts";
const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  overflow-y: scroll;
  h1 {
    margin: 0.5rem 0;
  }
`;
const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;

  height: fit-content;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChartBox = styled.div`
  background-color: white;
  box-shadow: 0.2rem 0.2rem 0.8rem #d1d1d1;
  border-radius: 0.5rem;
  padding: 1rem;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      color: #0000008e;
      font-weight: 500;
    }
  }
`;

const RightDiv = styled.div`
  height: 100%;
  background-color: white;
  box-shadow: 0.2rem 0.2rem 0.8rem #d1d1d1;
  border-radius: 0.5rem;
  padding: 1rem;
  h2 {
    color: #0000008e;
    font-weight: 500;
    text-align: center;
  }
`;
const Select = styled.select`
  padding: 0.4rem;
  border: none;
  color: #777;
  background-color: white;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  letter-spacing: 0.04rem;
  border: 1px solid #777;
  border-style: dotted;
  text-transform: capitalize;
  &:focus {
    outline: none;
    border: none;
    border: 1px solid #777;
    border-style: dotted;
  }
  @media only screen and (max-width: 1099px) {
    padding: 1rem 0;
  }
`;
const Option = styled.option`
  color: #777;
  font-weight: bold;
  text-transform: capitalize;
`;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const UserPanelHome = () => {
  const earningData = [
    {
      2024: {
        Jan: 4000,
        Feb: 0,
        Mar: 0,
        Apr: 4545,
        May: 5545,
        Jun: 1254,
        Jul: 1545,
        Aug: 5454,
        Sep: 8841,
        Oct: 8515,
        Nov: 9656,
        Dec: 4546,
      },
      2025: {
        Jan: 7635,
        Feb: 2464,
        Mar: 2864,
        Apr: 4545,
        May: 7546,
        Jun: 1254,
        Jul: 1545,
        Aug: 5454,
        Sep: 8841,
        Oct: 8515,
        Nov: 9656,
        Dec: 4546,
      },
    },
  ];
  const reprotsData = [
    {
      name: "Amazon",
      hrs: 2.4,
    },
    {
      name: "Apple Music",
      hrs: 1,
    },
    {
      name: "Amazon",
      hrs: 5,
    },
    {
      name: "Youtube",
      hrs: 20,
    },
    {
      name: "Savan",
      hrs: 8,
    },
    {
      name: "Savan",
      hrs: 7,
    },
    {
      name: "Savan",
      hrs: 8,
    },
  ];
  const [selectedYear, setSelectedYear] = useState(2024);
  const [data, setData] = useState([]);
  useEffect(() => {
    const res = earningData[0][selectedYear];
    let arr = [];
    for (const key in res) {
      const obj = {
        name: key,
        amount: res[key],
      };
      arr.push(obj);
    }
    console.log(arr);
    setData(arr);

    return () => {};
  }, []);

  const getSelectedValue = (e) => {
    const ele = document.querySelector(`#${e.target.id}`);
    const value = ele.options[ele.selectedIndex].value;
    const res = earningData[0][value];
    let arr = [];
    for (const key in res) {
      const obj = {
        name: key,
        amount: res[key],
      };
      arr.push(obj);
    }
    console.log(arr);
    setData(arr);
  };
  return (
    <MainDiv>
      <Breadcrumb
        items={[
          {
            title: "User Panel",
          },
          {
            title: "Home",
          },
        ]}
      />
      <h1>
        <span>Overview</span>
      </h1>
      <ContentDiv>
        <LeftDiv>
          {" "}
          <ChartBox>
            <div style={{ padding: "0 1rem" }}>
              {" "}
              <h2>Earning</h2>{" "}
              <Select name="category" id="category" onChange={getSelectedValue}>
                <Option value={2024}>2024</Option>
                <Option value={2025}>2025</Option>
              </Select>
            </div>
            <ResponsiveContainer width={"100%"} height={300}>
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" style={{ fontSize: ".8rem" }} />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  fill="#1677FF"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartBox>
          <ChartBox>
            <h2>Reports</h2>{" "}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={reprotsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Bar
                  dataKey="pv"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                /> */}
                <Bar
                  dataKey="hrs"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </LeftDiv>
        <RightDiv>
          <h2>Reports Summary</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="hrs"
                isAnimationActive={true}
                data={reprotsData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {reprotsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </RightDiv>
      </ContentDiv>
    </MainDiv>
  );
};

export default UserPanelHome;
