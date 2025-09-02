import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Divider,
  Typography,
  Progress,
  Table,
  Tag,
  Space,
  Button,
  Spin,
  Alert,
} from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileDoneOutlined,
  HourglassOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  LineChartOutlined,
  CalendarOutlined,
  CopyrightOutlined,
  FileProtectOutlined,
  WarningOutlined,
  DollarOutlined,
  TransactionOutlined,
  WalletOutlined,
  GiftOutlined,
  BankOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MusicLoader from "../Loader/MusicLoader";

const { Title, Text } = Typography;

const DashboardContainer = styled.div`
  padding: 24px;
  background-color: #f7f9fc;
  height: 100%;
  overflow: scroll;
`;

const StatsCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 24px;
    font-weight: 600;
    font-size: 16px;
  }

  .ant-card-body {
    padding: 24px;
  }
`;

const SectionTitle = styled(Title)`
  margin-bottom: 24px !important;
  color: #1f1f1f;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 3px;
    background-color: #1677ff;
    border-radius: 3px;
  }
`;

const StatisticWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .ant-statistic-title {
    color: #666;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 4px;
  }

  .ant-statistic-content {
    color: #333;
    font-weight: 600;
  }
`;

const IconWrapper = styled.div`
  background-color: ${(props) => props.bgColor || "#e6f7ff"};
  color: ${(props) => props.color || "#1677ff"};
  font-size: 24px;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const AdminHome = () => {
  const [userStats, setUserStats] = useState(null);
  const [workStats, setWorkStats] = useState(null);
  const [copyrightStats, setCopyrightStats] = useState(null);
  const [paymentStats, setPaymentStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Static data for recent users
  const recentUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "active",
      joinDate: "2023-08-15",
    },
    {
      id: "2",
      name: "Sara Smith",
      email: "sara@example.com",
      status: "pending",
      joinDate: "2023-08-14",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      status: "active",
      joinDate: "2023-08-12",
    },
  ];

  // Static data for recent work
  const recentWork = [
    {
      id: "1",
      name: "New Album Release",
      userName: "John Doe",
      status: "pending",
      date: "2023-08-15",
    },
    {
      id: "2",
      name: "Single Promotion",
      userName: "Sara Smith",
      status: "processing",
      date: "2023-08-12",
    },
    {
      id: "3",
      name: "Music Video Production",
      userName: "Michael Brown",
      status: "completed",
      date: "2023-08-10",
    },
  ];

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/admin/dashboard-stats`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard statistics");
        }

        const data = await response.json();
        setUserStats(data.userStats);
        setWorkStats(data.workStats);
        setCopyrightStats(data.copyrightStats);
        setPaymentStats(data.paymentStats);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);

        // Fallback to default stats if API fails
        setUserStats({
          totalUsers: 267,
          pendingUsers: 32,
          activeUsers: 235,
          newUsersThisMonth: 43,
        });

        setWorkStats({
          totalWork: 421,
          pendingWork: 86,
          processingWork: 120,
          completedWork: 215,
          workThisMonth: 67,
        });

        setCopyrightStats({
          totalCopyright: 93,
          pendingCopyright: 24,
          resolvedCopyright: 58,
          rejectedCopyright: 11,
        });

        // Fallback for payment stats
        setPaymentStats({
          totalPayment: 54680.25,
          totalPaid: 42370.5,
          totalBonusPaid: 3250.75,
          balanceRem: 9059.0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const userColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/admin-panel/user-profile/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "active"
            ? "green"
            : status === "pending"
            ? "gold"
            : "blue";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Joined",
      dataIndex: "joinDate",
      key: "joinDate",
    },
  ];

  const workColumns = [
    {
      title: "Project",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/admin-panel/work/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "User",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "completed":
            color = "green";
            break;
          case "processing":
            color = "blue";
            break;
          case "pending":
            color = "gold";
            break;
          default:
            color = "default";
        }

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  if (isLoading) {
    return (
      <DashboardContainer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MusicLoader />
      </DashboardContainer>
    );
  }

  if (error && !userStats && !workStats) {
    return (
      <DashboardContainer>
        <Alert
          message="Error Loading Dashboard"
          description={error}
          type="error"
          showIcon
        />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <SectionTitle level={2}>Admin Dashboard</SectionTitle>
      <Divider orientation="left" style={{ marginTop: "40px" }}>
        <Space>
          <FileDoneOutlined />
          Work Statistics
        </Space>
      </Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#e6f7ff" color="#1677ff">
                <FileDoneOutlined />
              </IconWrapper>
              <Statistic
                title="Total Work"
                value={workStats.totalWork}
                valueStyle={{ color: "#1677ff" }}
              />
              <Text type="secondary">All work items</Text>
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#fff2e8" color="#fa8c16">
                <ClockCircleOutlined />
              </IconWrapper>
              <Statistic
                title="Pending Work"
                value={workStats.pendingWork}
                valueStyle={{ color: "#fa8c16" }}
              />
              <Progress
                percent={Math.round(
                  (workStats.pendingWork / workStats.totalWork) * 100
                )}
                status="active"
                strokeColor="#fa8c16"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#f0f5ff" color="#2f54eb">
                <HourglassOutlined />
              </IconWrapper>
              <Statistic
                title="Processing Work"
                value={workStats.processingWork}
                valueStyle={{ color: "#2f54eb" }}
              />
              <Progress
                percent={Math.round(
                  (workStats.processingWork / workStats.totalWork) * 100
                )}
                status="active"
                strokeColor="#2f54eb"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#f6ffed" color="#52c41a">
                <CheckCircleOutlined />
              </IconWrapper>
              <Statistic
                title="Completed Work"
                value={workStats.completedWork}
                valueStyle={{ color: "#52c41a" }}
              />
              <Progress
                percent={Math.round(
                  (workStats.completedWork / workStats.totalWork) * 100
                )}
                status="success"
                strokeColor="#52c41a"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#fcffe6" color="#a0d911">
                <CalendarOutlined />
              </IconWrapper>
              <Statistic
                title="Work This Month"
                value={workStats.workThisMonth}
                valueStyle={{ color: "#a0d911" }}
              />
              <Text type="secondary">New work orders</Text>
            </StatisticWrapper>
          </StatsCard>
        </Col>
      </Row>
      {/* Payment Statistics Section */}
      <Divider orientation="left" style={{ marginTop: "40px" }}>
        <Space>
          <DollarOutlined />
          Payment Statistics
        </Space>
      </Divider>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#e6fffb" color="#13c2c2">
                <DollarOutlined />
              </IconWrapper>
              <Statistic
                title="Total Revenue"
                value={paymentStats?.totalPayment || 0}
                valueStyle={{ color: "#13c2c2" }}
                formatter={(value) => formatCurrency(value)}
              />
              <Text type="secondary">All financial transactions</Text>
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#f6ffed" color="#52c41a">
                <TransactionOutlined />
              </IconWrapper>
              <Statistic
                title="Total Paid"
                value={paymentStats?.totalPaid || 0}
                valueStyle={{ color: "#52c41a" }}
                formatter={(value) => formatCurrency(value)}
              />
              <Progress
                percent={Math.round(
                  (paymentStats?.totalPaid / paymentStats?.totalPayment) *
                    100 || 0
                )}
                status="success"
                strokeColor="#52c41a"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#fff0f6" color="#eb2f96">
                <GiftOutlined />
              </IconWrapper>
              <Statistic
                title="Total Bonus Paid"
                value={paymentStats?.totalBonusPaid || 0}
                valueStyle={{ color: "#eb2f96" }}
                formatter={(value) => formatCurrency(value)}
              />
              <Progress
                percent={Math.round(
                  (paymentStats?.totalBonusPaid / paymentStats?.totalPayment) *
                    100 || 0
                )}
                status="active"
                strokeColor="#eb2f96"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#f9f0ff" color="#722ed1">
                <WalletOutlined />
              </IconWrapper>
              <Statistic
                title="Balance Remaining"
                value={paymentStats?.balanceRem || 0}
                valueStyle={{ color: "#722ed1" }}
                formatter={(value) => formatCurrency(value)}
              />
              <Progress
                percent={Math.round(
                  (paymentStats?.balanceRem / paymentStats?.totalPayment) *
                    100 || 0
                )}
                status="active"
                strokeColor="#722ed1"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>
      </Row>
      <Divider orientation="left">
        <Space>
          <TeamOutlined />
          User Statistics
        </Space>
      </Divider>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#e6f7ff" color="#1677ff">
                <TeamOutlined />
              </IconWrapper>
              <Statistic
                title="Total Users"
                value={userStats.totalUsers}
                valueStyle={{ color: "#1677ff" }}
              />
              <Text type="secondary">All registered users</Text>
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#fff2e8" color="#fa541c">
                <UserSwitchOutlined />
              </IconWrapper>
              <Statistic
                title="Pending Approval"
                value={userStats.pendingUsers}
                valueStyle={{ color: "#fa541c" }}
              />
              <Progress
                percent={Math.round(
                  (userStats.pendingUsers / userStats.totalUsers) * 100
                )}
                status="active"
                strokeColor="#fa541c"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#f6ffed" color="#52c41a">
                <UserOutlined />
              </IconWrapper>
              <Statistic
                title="Active Users"
                value={userStats.activeUsers}
                valueStyle={{ color: "#52c41a" }}
              />
              <Progress
                percent={Math.round(
                  (userStats.activeUsers / userStats.totalUsers) * 100
                )}
                status="active"
                strokeColor="#52c41a"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#e6f7ff" color="#1677ff">
                <UserAddOutlined />
              </IconWrapper>
              <Statistic
                title="New This Month"
                value={userStats.newUsersThisMonth}
                valueStyle={{ color: "#1677ff" }}
              />
              <Text type="secondary">Recent signups</Text>
            </StatisticWrapper>
          </StatsCard>
        </Col>
      </Row>

      {/* Copyright Statistics Section */}
      <Divider orientation="left" style={{ marginTop: "40px" }}>
        <Space>
          <CopyrightOutlined />
          Copyright Claims Statistics
        </Space>
      </Divider>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#e6f7ff" color="#1677ff">
                <CopyrightOutlined />
              </IconWrapper>
              <Statistic
                title="Total Claims"
                value={copyrightStats.totalCopyright}
                valueStyle={{ color: "#1677ff" }}
              />
              <Text type="secondary">All copyright claims</Text>
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#fff2e8" color="#fa8c16">
                <ClockCircleOutlined />
              </IconWrapper>
              <Statistic
                title="Pending Claims"
                value={copyrightStats.pendingCopyright}
                valueStyle={{ color: "#fa8c16" }}
              />
              <Progress
                percent={Math.round(
                  (copyrightStats.pendingCopyright /
                    copyrightStats.totalCopyright) *
                    100
                )}
                status="active"
                strokeColor="#fa8c16"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#f6ffed" color="#52c41a">
                <FileProtectOutlined />
              </IconWrapper>
              <Statistic
                title="Resolved Claims"
                value={copyrightStats.resolvedCopyright}
                valueStyle={{ color: "#52c41a" }}
              />
              <Progress
                percent={Math.round(
                  (copyrightStats.resolvedCopyright /
                    copyrightStats.totalCopyright) *
                    100
                )}
                status="success"
                strokeColor="#52c41a"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatsCard>
            <StatisticWrapper>
              <IconWrapper bgColor="#fff1f0" color="#f5222d">
                <WarningOutlined />
              </IconWrapper>
              <Statistic
                title="Rejected Claims"
                value={copyrightStats.rejectedCopyright}
                valueStyle={{ color: "#f5222d" }}
              />
              <Progress
                percent={Math.round(
                  (copyrightStats.rejectedCopyright /
                    copyrightStats.totalCopyright) *
                    100
                )}
                status="exception"
                strokeColor="#f5222d"
              />
            </StatisticWrapper>
          </StatsCard>
        </Col>
      </Row>
    </DashboardContainer>
  );
};

export default AdminHome;
