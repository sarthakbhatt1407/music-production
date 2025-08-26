import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
  CloseOutlined,
  HomeOutlined,
  HistoryOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import MusicLoader from "../Loader/MusicLoader";
import {
  Breadcrumb,
  Empty,
  Input,
  Card,
  Tag,
  Space,
  Avatar,
  Badge,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOrdersStatus from "../UserOrdersStatus";

const { Title, Text } = Typography;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f9fc;
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  overflow-y: auto;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchContainer = styled.div`
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TableContainer = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  overflow: hidden;

  .ant-card-body {
    padding: 0;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  tr {
    background-color: #f4f6f9;

    td {
      text-align: center;
      padding: 1rem 0.5rem;
      color: #6c757d;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      font-weight: 600;
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f8fafc !important;
    }

    td {
      color: #3c4858;
      text-transform: capitalize;
      text-align: center;
      padding: 1rem 0.5rem;
      font-weight: 500;
      font-size: 0.9rem;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

const StatusTag = styled(Tag)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  gap: 0.4rem;
  width: fit-content;
  margin: 0 auto;
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
`;

const MobileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (min-width: 1001px) {
    display: none;
  }
`;

const AlbumCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .ant-card-cover {
    height: 180px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover .ant-card-cover img {
    transform: scale(1.05);
  }

  .ant-card-body {
    padding: 1rem;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemLabel = styled(Text)`
  color: #6c757d;
  font-weight: 500;
`;

const ItemValue = styled(Text)`
  color: #3c4858;
  font-weight: 500;
  text-transform: capitalize;
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #1677ff;
  border: 1px solid #1677ff;
  border-radius: 20px;
  padding: 0.3rem 0.6rem;
  transition: all 0.2s;

  &:hover {
    background-color: #1677ff;
    color: white;
  }
`;

const History = () => {
  const userId = useSelector((state) => state.userId);
  const [orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  let sNo = 0;

  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/user-all-orders/?user=${userId}`
    );
    const data = await res.json();

    if (res.ok) {
      const arr = data.orders;
      arr.reverse();
      setOrders(arr);
      setFilteredOrders(arr);
    } else {
      setOrders([]);
      setFilteredOrders([]);
    }
    setIsloading(false);
  };

  useEffect(() => {
    fetcher();
    return () => {};
  }, []);

  const onCHangeHandler = (e) => {
    const val = e.target.value.toLowerCase();
    const arr = orders.filter((ord) => {
      return ord.title.toLowerCase().includes(val);
    });
    setFilteredOrders(arr);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "waiting":
        return (
          <StatusTag color="#FFF2D7" style={{ color: "#FFBC21" }}>
            <ClockCircleOutlined /> Waiting for approval
          </StatusTag>
        );
      case "processing":
        return (
          <StatusTag color="#D8F2FF" style={{ color: "#42C3FF" }}>
            <EditOutlined /> Processing
          </StatusTag>
        );
      case "completed":
        return (
          <StatusTag color="#D9EDDB" style={{ color: "#59BB5A" }}>
            <CheckCircleOutlined style={{ color: "#59BB5A" }} /> Live
          </StatusTag>
        );
      case "rejected":
        return (
          <StatusTag color="#FFE6E6" style={{ color: "#FF4D4F" }}>
            <CloseOutlined /> Rejected
          </StatusTag>
        );
      case "takedown":
        return (
          <StatusTag color="#FFE6E6" style={{ color: "#FF4D4F" }}>
            <CloseOutlined /> Removed
          </StatusTag>
        );
      default:
        return <StatusTag>{status}</StatusTag>;
    }
  };

  return (
    <MainContainer>
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
          { title: "History" },
        ]}
        style={{ marginBottom: "1rem" }}
      />

      <PageHeader>
        <HeaderTitle>
          <Title level={4} style={{ margin: 0 }}>
            <HistoryOutlined /> Order History
          </Title>
          {filteredOrders && (
            <Badge
              count={filteredOrders.filter((o) => !o.deleted).length}
              style={{ backgroundColor: "#1677ff" }}
            />
          )}
        </HeaderTitle>

        <SearchContainer>
          <Input
            placeholder="Search by album title"
            prefix={<SearchOutlined />}
            onChange={onCHangeHandler}
            allowClear
          />
        </SearchContainer>
      </PageHeader>

      {isLoading && <MusicLoader />}

      <TableContainer>
        {orders && (
          <StyledTable cellSpacing={0}>
            <TableHead>
              <tr>
                <td>#</td>
                <td>Thumbnail</td>
                <td>Album</td>
                <td>Label</td>
                <td>Album Type</td>
                <td>Language</td>
                <td>Created</td>
                <td>Release Date</td>
                <td>Status</td>
                <td>View</td>
              </tr>
            </TableHead>

            <TableBody>
              {filteredOrders.map((ord) => {
                if (ord.deleted === true) {
                  return null;
                }

                const {
                  title,
                  labelName,
                  language,
                  albumType,
                  status,
                  dateOfRelease,
                  orderDateAndTime,
                  thumbnail,
                  dateLive,
                  id,
                } = ord;

                const th = thumbnail.includes("cloudinary")
                  ? thumbnail
                  : `${process.env.REACT_APP_BASE_URL}/${thumbnail}`;

                sNo++;

                return (
                  <tr
                    key={id}
                    style={{
                      backgroundColor: sNo % 2 === 0 ? "#FAFAFC" : "white",
                    }}
                  >
                    <td>{sNo}</td>
                    <td>
                      <img src={th} alt={title} />
                    </td>
                    <td>{title}</td>
                    <td>{labelName}</td>
                    <td>{albumType}</td>
                    <td>{language}</td>
                    <td>{orderDateAndTime.split("/")[0]}</td>
                    <td>
                      {dateLive && dateLive.length > 2
                        ? dateLive
                        : dateOfRelease}
                    </td>
                    <td>{renderStatus(status)}</td>
                    <td>
                      <ViewButton to={`/user-panel/order/${id}`}>
                        <EyeOutlined />
                      </ViewButton>
                    </td>
                  </tr>
                );
              })}
            </TableBody>
          </StyledTable>
        )}

        {filteredOrders && filteredOrders.length === 0 && !isLoading && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No orders found"
            style={{ padding: "3rem 0" }}
          />
        )}
      </TableContainer>

      <MobileContainer>
        {filteredOrders &&
          filteredOrders.map((order) => {
            if (order.deleted === true) {
              return null;
            }

            const {
              title,
              language,
              albumType,
              status,
              dateOfRelease,
              orderDateAndTime,
              thumbnail,
              labelName,
              id,
              dateLive,
            } = order;

            const thumbSrc = thumbnail.includes("cloudinary")
              ? thumbnail
              : `${process.env.REACT_APP_BASE_URL}/${thumbnail}`;

            return (
              <AlbumCard
                key={id}
                cover={<img alt={title} src={thumbSrc} />}
                hoverable
              >
                <Title level={5} style={{ margin: 0, marginBottom: "1rem" }}>
                  {title}
                </Title>

                <CardContent>
                  <CardItem>
                    <ItemLabel>Status</ItemLabel>
                    <div>{renderStatus(status)}</div>
                  </CardItem>

                  <CardItem>
                    <ItemLabel>Label</ItemLabel>
                    <ItemValue>{labelName}</ItemValue>
                  </CardItem>

                  <CardItem>
                    <ItemLabel>Album Type</ItemLabel>
                    <ItemValue>{albumType}</ItemValue>
                  </CardItem>

                  <CardItem>
                    <ItemLabel>Language</ItemLabel>
                    <ItemValue>{language}</ItemValue>
                  </CardItem>

                  <CardItem>
                    <ItemLabel>Release Date</ItemLabel>
                    <ItemValue>
                      {dateLive && dateLive.length > 2
                        ? dateLive
                        : dateOfRelease}
                    </ItemValue>
                  </CardItem>

                  <CardItem>
                    <ItemLabel>Created</ItemLabel>
                    <ItemValue>{orderDateAndTime.split("/")[0]}</ItemValue>
                  </CardItem>

                  <Space
                    style={{
                      marginTop: "0.5rem",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <Link to={`/user-panel/order/${id}`}>
                      <ViewButton>
                        <Space>
                          <EyeOutlined /> View Details
                        </Space>
                      </ViewButton>
                    </Link>
                  </Space>
                </CardContent>
              </AlbumCard>
            );
          })}

        {filteredOrders && filteredOrders.length === 0 && !isLoading && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No orders found"
            style={{ gridColumn: "1 / -1", padding: "3rem 0" }}
          />
        )}
      </MobileContainer>
    </MainContainer>
  );
};

export default History;
