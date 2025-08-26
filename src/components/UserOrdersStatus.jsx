import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  DashboardOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Typography, Skeleton } from "antd";

const { Title, Text } = Typography;

const StatusCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.09);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const WelcomeSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 0.5rem;
  }
`;

const UserName = styled(Title)`
  margin: 0 0.5rem !important;
  background: linear-gradient(90deg, #1677ff, #52c41a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: capitalize;

  @media (max-width: 768px) {
    margin: 0 !important;
  }
`;

// Updated StatsGrid to display in a single line
const StatsGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 8px;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  /* Ensure cards have equal width */
  & > div {
    flex: 0 0 calc(25% - 12px);
    min-width: 240px;
  }

  @media (max-width: 1024px) {
    & > div {
      flex: 0 0 280px;
    }
  }
`;

const StatCard = styled.div`
  background: ${(props) => props.background || "#fff"};
  background: ${(props) => props.gradient || ""};
  border-radius: 12px;
  padding: 1.5rem;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  font-size: 1.75rem;
  margin-right: 0.75rem;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatTitle = styled(Text)`
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
`;

const StatValue = styled(Title)`
  font-size: 2.5rem !important;
  margin: 0 !important;
  color: white !important;
`;

const StatLabel = styled(Text)`
  font-size: 0.9rem;
  opacity: 0.8;
  color: white;
`;

const UserOrdersStatus = () => {
  const labelName = useSelector((state) => state.labelName);
  const userId = useSelector((state) => state.userId);

  const [pendingOrd, setPendingOrd] = useState(null);
  const [processingOrd, setProcessingOrd] = useState(null);
  const [compOrd, setCompOrd] = useState(null);
  const [totalOrd, setTotalOrd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetcher = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/user-all-orders/?user=${userId}`
      );
      const data = await res.json();

      if (res.ok) {
        const arr = data.orders;
        const com = arr.filter((ord) => {
          return (
            ord.status === "pending" ||
            ord.status === "completed" ||
            ord.status === "processing"
          );
        });

        const pending = arr.filter((ord) => {
          return ord.status === "pending" && ord.deleted !== true;
        });
        const comp = arr.filter((ord) => {
          return ord.status === "completed" && ord.deleted !== true;
        });
        const proc = arr.filter((ord) => {
          return ord.status === "processing" && ord.deleted !== true;
        });
        setTotalOrd(com);
        setProcessingOrd(proc);
        setCompOrd(comp);
        setPendingOrd(pending);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StatusCard>
      {isLoading ? (
        <>
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton.Button
            active
            block
            style={{ height: "160px", marginTop: "1rem" }}
          />
        </>
      ) : (
        <>
          <WelcomeSection>
            <Text style={{ fontSize: "1.25rem" }}>Hi,</Text>
            <UserName level={3}>{labelName}</UserName>
            <Text style={{ fontSize: "1.25rem" }}>
              Welcome to Rivaaz Films!
            </Text>
          </WelcomeSection>

          <StatsGrid>
            <div>
              <StatCard gradient="linear-gradient(120deg, #4776E6, #8E54E9)">
                <StatHeader>
                  <StatIcon>
                    <DashboardOutlined />
                  </StatIcon>
                  <StatTitle>Total Albums</StatTitle>
                </StatHeader>
                <div>
                  <StatValue level={2}>
                    {totalOrd ? totalOrd.length : 0}
                  </StatValue>
                  <StatLabel>Albums in your catalog</StatLabel>
                </div>
              </StatCard>
            </div>

            <div>
              <StatCard gradient="linear-gradient(120deg, #48c6ef, #6f86d6)">
                <StatHeader>
                  <StatIcon>
                    <ClockCircleOutlined />
                  </StatIcon>
                  <StatTitle>Pending</StatTitle>
                </StatHeader>
                <div>
                  <StatValue level={2}>
                    {pendingOrd ? pendingOrd.length : 0}
                  </StatValue>
                  <StatLabel>Awaiting approval</StatLabel>
                </div>
              </StatCard>
            </div>

            <div>
              <StatCard gradient="linear-gradient(120deg, #f5576c, #f093fb)">
                <StatHeader>
                  <StatIcon>
                    <SyncOutlined spin />
                  </StatIcon>
                  <StatTitle>Processing</StatTitle>
                </StatHeader>
                <div>
                  <StatValue level={2}>
                    {processingOrd ? processingOrd.length : 0}
                  </StatValue>
                  <StatLabel>Being prepared</StatLabel>
                </div>
              </StatCard>
            </div>

            <div>
              <StatCard gradient="linear-gradient(120deg, #43e97b, #38f9d7)">
                <StatHeader>
                  <StatIcon>
                    <CheckCircleOutlined />
                  </StatIcon>
                  <StatTitle>Completed</StatTitle>
                </StatHeader>
                <div>
                  <StatValue level={2}>
                    {compOrd ? compOrd.length : 0}
                  </StatValue>
                  <StatLabel>Live and active</StatLabel>
                </div>
              </StatCard>
            </div>
          </StatsGrid>
        </>
      )}
    </StatusCard>
  );
};

export default UserOrdersStatus;
