import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Breadcrumb,
  Card,
  Select,
  Typography,
  Skeleton,
  Statistic,
  Row,
  Col,
  Divider,
  Space,
  Badge,
} from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import {
  HomeOutlined,
  DashboardOutlined,
  DollarOutlined,
  RiseOutlined,
  CalendarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";
import UserOrdersStatus from "../UserOrdersStatus";

const { Title, Text } = Typography;
const { Option } = Select;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 1.5rem;
  background-color: #f7f9fc;
  border-radius: 12px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 1.5rem;
`;

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }

  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
    padding: 0 24px;
  }

  .ant-card-head-title {
    padding: 16px 0;
    font-size: 1rem;
    font-weight: 600;
    color: #3c4858;
  }

  .ant-card-body {
    padding: 24px;
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 16px;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 1rem;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;

  .ant-card-body {
    padding: 1.5rem;
  }

  .ant-statistic-title {
    color: #6c757d;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .ant-statistic-content {
    color: #3c4858;
  }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Check if the value is a number and handle it safely
    const value = payload[0].value;
    const formattedValue = typeof value === "number" ? value.toFixed(2) : value;

    return (
      <div
        style={{
          background: "white",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ margin: 0, fontWeight: 500 }}>{`${label}`}</p>
        <p style={{ margin: 0, color: "#1677ff" }}>
          {`Amount: ₹${formattedValue}`}
        </p>
      </div>
    );
  }
  return null;
};

const COLORSSTREAM = {
  Spotify: "#25D865",
  Wynk: "#D92E33",
  JioSaavn: "#1DA48C",
  Amazon: "#DBB67A",
  Gaana: "#FE6109",
  YouTube: "#FF0808",
  SoundCloud: "#FE8008",
  Tiktok: "#2CF4EF",
  "FB/Insta": "#1FADFD",
  Hungama: "#73BF4C",
  Other: "#495145",
  "Apple Music": "#1FADFD",
};

const UserPanelHome = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const defaultEarning = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };
  const defaultReports = {
    Spotify: 0,
    Wynk: 0,
    "Apple Music": 0,
    JioSaavn: 0,
    Amazon: 0,
    Gaana: 0,
    YouTube: 0,
    SoundCloud: 0,
    Tiktok: 0,
    "FB/Insta": 0,
    Hungama: 0,
    Other: 0,
  };

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const [userData, setUserdata] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
  const [earningSelectedYear, setEarningSelectedYear] = useState(currentYear);
  const [reportSelectedYear, setReportSelectedYear] = useState(currentYear);
  const [earningData, setEarningData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.userId);

  // Calculate total earnings for the selected year
  const calculateTotalEarnings = () => {
    if (!earningData) return 0;
    return earningData.reduce((total, item) => total + item.amount, 0);
  };

  // Calculate current month earnings
  const getCurrentMonthEarnings = () => {
    if (!earningData) return 0;
    const currentMonthData = earningData.find(
      (item) => item.name === months[currentMonth]
    );
    return currentMonthData ? currentMonthData.amount : 0;
  };

  // Calculate average monthly earnings
  const getAverageMonthlyEarnings = () => {
    const total = calculateTotalEarnings();
    return earningData ? total / earningData.length : 0;
  };

  const fecher = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/get-user/?id=${userId}`
      );
      const data = await res.json();

      if (res.ok) {
        setUserdata(data.user);

        // for analytics
        let resArr;
        if (data.user.analytics[0][reportSelectedYear]) {
          resArr = data.user.analytics[0][reportSelectedYear][selectedMonth];
        }
        let arr = [];

        for (const key in resArr) {
          if (key === "Other") {
            continue;
          }
          const obj = {
            name: key,
            views: resArr[key],
          };
          arr.push(obj);
        }
        arr.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        for (const key in resArr) {
          if (key === "Other") {
            const obj = {
              name: key,
              views: resArr[key],
            };
            arr.push(obj);
          }
          continue;
        }

        setReportData(arr);
        //   for earning
        resArr = data.user.finacialReport[0][earningSelectedYear];
        arr = [];
        for (const key in resArr) {
          const obj = {
            name: key,
            amount: resArr[key],
          };
          arr.push(obj);
        }
        setEarningData(arr);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fecher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSelectedValue = (value) => {
    setEarningSelectedYear(Number(value));
    let resArr = userData.finacialReport[0][value];
    if (!resArr) {
      resArr = defaultEarning;
    }
    let arr = [];
    for (const key in resArr) {
      const obj = {
        name: key,
        amount: resArr[key],
      };
      arr.push(obj);
    }
    setEarningData(arr);
  };

  const reportsYearChanger = (value) => {
    setReportSelectedYear(Number(value));

    let resArr;
    if ((resArr = userData.analytics[0][value])) {
      resArr = userData.analytics[0][value][selectedMonth];
    }
    if (!resArr) {
      resArr = defaultReports;
    }
    let arr = [];
    for (const key in resArr) {
      const obj = {
        name: key,
        views: resArr[key],
      };
      arr.push(obj);
    }

    setReportData(arr);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    let resArr;
    if ((resArr = userData.analytics[0][reportSelectedYear])) {
      resArr = userData.analytics[0][reportSelectedYear][value];
    }
    if (!resArr) {
      resArr = defaultReports;
    }
    let arr = [];
    for (const key in resArr) {
      const obj = {
        name: key,
        views: resArr[key],
      };
      arr.push(obj);
    }

    setReportData(arr);
  };

  const renderStats = () => {
    if (!earningData) return null;

    return (
      <StatGrid>
        <StatCard>
          <Statistic
            title="Total Earnings (Year)"
            value={calculateTotalEarnings()}
            prefix="$"
            precision={2}
            valueStyle={{ color: "#3f8600", fontSize: "1.5rem" }}
            suffix={<RiseOutlined />}
          />
          <Text
            type="secondary"
            style={{ marginTop: "0.5rem", display: "block" }}
          >
            For {earningSelectedYear}
          </Text>
        </StatCard>

        <StatCard>
          <Statistic
            title="Current Month Earnings"
            value={getCurrentMonthEarnings()}
            prefix="$"
            precision={2}
            valueStyle={{ color: "#1677ff", fontSize: "1.5rem" }}
          />
          <Text
            type="secondary"
            style={{ marginTop: "0.5rem", display: "block" }}
          >
            {months[currentMonth]} {earningSelectedYear}
          </Text>
        </StatCard>

        <StatCard>
          <Statistic
            title="Monthly Average"
            value={getAverageMonthlyEarnings()}
            prefix="$"
            precision={2}
            valueStyle={{ fontSize: "1.5rem" }}
          />
          <Text
            type="secondary"
            style={{ marginTop: "0.5rem", display: "block" }}
          >
            Based on monthly data
          </Text>
        </StatCard>
      </StatGrid>
    );
  };

  return (
    <MainContainer>
      <HeaderSection>
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/">
                  <HomeOutlined />
                </Link>
              ),
            },
            { title: "User Panel" },
            { title: "Dashboard" },
          ]}
        />

        <PageTitle>
          <Title level={3} style={{ margin: 0 }}>
            <DashboardOutlined /> Dashboard Overview
          </Title>
          {userData && (
            <Badge count="Live" style={{ backgroundColor: "#52c41a" }} />
          )}
        </PageTitle>
      </HeaderSection>

      {isLoading ? (
        <>
          <Skeleton
            active
            paragraph={{ rows: 2 }}
            style={{ marginBottom: "1rem" }}
          />
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Skeleton.Button
                active
                style={{ width: "100%", height: "120px" }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Skeleton.Button
                active
                style={{ width: "100%", height: "120px" }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Skeleton.Button
                active
                style={{ width: "100%", height: "120px" }}
              />
            </Col>
          </Row>
          <Skeleton.Button
            active
            style={{ width: "100%", height: "400px", marginTop: "1.5rem" }}
          />
        </>
      ) : (
        <>
          <UserOrdersStatus />

          {userData && (
            <DashboardGrid>
              {/* {renderStats()} */}

              <StyledCard>
                <CardHeader>
                  <Space align="center">
                    <Title level={4} style={{ margin: 0 }}>
                      Earnings
                    </Title>
                  </Space>

                  <Select
                    defaultValue={`${currentYear}`}
                    style={{ width: 120 }}
                    onChange={getSelectedValue}
                    suffixIcon={<CalendarOutlined />}
                  >
                    <Option value={`${currentYear}`}>{currentYear}</Option>
                    <Option value={`${currentYear - 1}`}>
                      {currentYear - 1}
                    </Option>
                    <Option value={`${currentYear - 2}`}>
                      {currentYear - 2}
                    </Option>
                  </Select>
                </CardHeader>

                <Divider style={{ margin: "0.5rem 0 1.5rem" }} />

                {earningData && (
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={earningData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorAmount"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#1677ff"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#1677ff"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          style={{ fontSize: "0.8rem" }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          style={{ fontSize: "0.8rem" }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#1677ff"
                          strokeWidth={2}
                          fill="url(#colorAmount)"
                          activeDot={{ r: 6 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </StyledCard>

              {/* Uncomment this section if you want to re-enable the reports chart */}
              <StyledCard>
                <CardHeader>
                  <Space align="center">
                    <BarChartOutlined
                      style={{ fontSize: "1.25rem", color: "#52c41a" }}
                    />
                    <Title level={4} style={{ margin: 0 }}>
                      Reports
                    </Title>
                  </Space>

                  <Space>
                    <Select
                      defaultValue={selectedMonth}
                      style={{ width: 100 }}
                      onChange={handleMonthChange}
                    >
                      {months.map((month) => (
                        <Option key={month} value={month}>
                          {month}
                        </Option>
                      ))}
                    </Select>

                    <Select
                      defaultValue={`${currentYear}`}
                      style={{ width: 100 }}
                      onChange={reportsYearChanger}
                    >
                      <Option value={`${currentYear}`}>{currentYear}</Option>
                      <Option value={`${currentYear - 1}`}>
                        {currentYear - 1}
                      </Option>
                      <Option value={`${currentYear - 2}`}>
                        {currentYear - 2}
                      </Option>
                    </Select>
                  </Space>
                </CardHeader>

                <Divider style={{ margin: "0.5rem 0 1.5rem" }} />

                {reportData && reportData.length > 0 ? (
                  <Row gutter={16}>
                    <Col xs={24} md={16}>
                      <ChartContainer>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={reportData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              {Object.entries(COLORSSTREAM).map(
                                ([name, color]) => (
                                  <linearGradient
                                    key={name}
                                    id={`color-${name}`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                  >
                                    <stop
                                      offset="0%"
                                      stopColor={color}
                                      stopOpacity={0.8}
                                    />
                                    <stop
                                      offset="95%"
                                      stopColor={color}
                                      stopOpacity={0.2}
                                    />
                                  </linearGradient>
                                )
                              )}
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                              vertical={false}
                            />
                            <XAxis
                              dataKey="name"
                              axisLine={false}
                              tickLine={false}
                              style={{ fontSize: "0.8rem" }}
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              style={{ fontSize: "0.8rem" }}
                            />
                            <Tooltip
                              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                              contentStyle={{
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                border: "none",
                              }}
                            />
                            <Legend
                              wrapperStyle={{
                                paddingTop: "10px",
                              }}
                            />
                            <Bar
                              dataKey="views"
                              name="Views"
                              radius={[4, 4, 0, 0]}
                              barSize={30}
                              animationDuration={1500}
                            >
                              {reportData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={`url(#color-${entry.name})`}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </Col>

                    <Col xs={24} md={8}>
                      <ChartContainer>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={reportData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="views"
                              nameKey="name"
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                              labelLine={false}
                              animationDuration={1500}
                            >
                              {reportData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORSSTREAM[entry.name]}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value, name) => [
                                `${value} views`,
                                name,
                              ]}
                              contentStyle={{
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                border: "none",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </Col>
                  </Row>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2rem",
                      minHeight: "300px",
                    }}
                  >
                    <BarChartOutlined
                      style={{
                        fontSize: "3rem",
                        color: "#d9d9d9",
                        marginBottom: "1rem",
                      }}
                    />
                    <Text type="secondary" style={{ fontSize: "1rem" }}>
                      No streaming data available for {selectedMonth}{" "}
                      {reportSelectedYear}
                    </Text>
                    <Text
                      type="secondary"
                      style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}
                    >
                      Try selecting a different month or year
                    </Text>
                  </div>
                )}
              </StyledCard>
            </DashboardGrid>
          )}
        </>
      )}

      {isLoading && <MusicLoader />}
    </MainContainer>
  );
};

export default UserPanelHome;
