import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  HomeOutlined,
  UserOutlined,
  FormOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import { Dropdown, Space } from "antd";

import { Layout, Menu, Button, theme, Avatar } from "antd";
import {
  AccountCircleOutlined,
  Copyright,
  HistoryOutlined,
  LibraryMusicOutlined,
  MessageOutlined,
  PeopleOutlineOutlined,
  QuestionAnswerOutlined,
  RestoreFromTrashOutlined,
  TimerRounded,
  WorkHistoryOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo/ready.png";
import styled from "@emotion/styled";
import { IoIosNotifications, IoIosNotificationsOff } from "react-icons/io";
import { Badge } from "@mui/material";
import MusicLoader from "../Loader/MusicLoader";
const { Header, Sider, Content } = Layout;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  img {
    width: 2rem;
  }
`;

const BrandDrawerPanel = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminView = useSelector((state) => state.adminView);
  console.log("adminviewwe", adminView);
  const demoLogin = async () => {
    const contactNum = "8126770620";
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/check-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactNum: contactNum,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.exists) {
        const loginRes = await fetch(
          `${process.env.REACT_APP_BASE_URL}/inf/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contactNum: contactNum,
            }),
          }
        );
        const loginData = await loginRes.json();
        console.log(loginData);

        if (loginData.isloggedIn) {
          setTimeout(() => {
            if (loginData.user.userType == "promoter") {
              dispatch({
                type: "log in",
                data: { ...loginData, type: "promoter", adminView: false },
              });
              navigate("/promotor-admin-panel/home");
            }
            if (loginData.user.userType == "influencer") {
              dispatch({
                type: "log in",
                data: { ...loginData, type: "influencer", adminView: false },
              });
              navigate("/influencer-admin-panel/home");
            }
            if (loginData.user.userType == "admin") {
              console.log(loginData.user.userType);

              dispatch({
                type: "log in",
                data: { ...loginData, type: "promotion-admin" },
              });
              navigate("/admin-admin-panel/home");
            }
          }, 700);
        }
      } else {
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const page = props.page;
  const items = adminView
    ? [
        {
          label: <Link to={"/promotor-admin-panel/profile"}>Profile</Link>,
          key: "0",
        },
        {
          type: "divider",
        },

        {
          label: (
            <span
              onClick={() => {
                dispatch({ type: "logout" });
                navigate("/promotions/login");
              }}
            >
              Log out
            </span>
          ),
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: (
            <span
              onClick={() => {
                demoLogin();
              }}
            >
              Admin Panel
            </span>
          ),
          key: "2",
        },
      ]
    : [
        {
          label: <Link to={"/promotor-admin-panel/profile"}>Profile</Link>,
          key: "0",
        },
        {
          type: "divider",
        },

        {
          label: (
            <span
              onClick={() => {
                dispatch({ type: "logout" });
                navigate("/promotions/login");
              }}
            >
              Log out
            </span>
          ),
          key: "1",
        },
      ];
  const defaultSelector = (page) => {
    if (page === "home") {
      return ["1"];
    }
    if (page === "new-order" || page === "new-order-navigation") {
      return ["2"];
    }

    if (page === "order-history") {
      return ["3"];
    }
    if (page === "chat") {
      return ["4"];
    }
    if (page === "profile") {
      return ["5"];
    }
    if (page === "pending-work") {
      return ["6"];
    }
    if (page === "all-users") {
      return ["7"];
    }
    if (page === "user-queries") {
      return ["8"];
    }
    if (page === "pending-profile") {
      return ["9"];
    }
    if (page === "notification") {
      return ["10"];
    }
  };

  const [unseenChat, setUnseenChat] = useState(0);
  const fetchChats = async (brandId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/get-chats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ brandId: "67a33c48d9f27471b3bd6eba" }),
        }
      );

      const data = await response.json();

      if (data.success) {
        if (data.chats.length > 0) {
          if (data.chats[data.chats.length - 1]["sender"] == "other") {
            setUnseenChat(1);
          } else {
            setUnseenChat(0);
          }
        }
      } else {
        throw new Error("Failed to load chats.");
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      {loading && <MusicLoader />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <LogoDiv>
          <img src={logo} alt="" />
        </LogoDiv>
        <Menu
          theme="dark"
          mode="inline"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".6rem",
            fontSize: "1rem",
          }}
          defaultSelectedKeys={defaultSelector(page)}
          items={[
            {
              key: "1",
              icon: (
                <Link
                  to={"/promotor-admin-panel/home"}
                  onClick={() => setCollapsed(true)}
                >
                  <HomeOutlined />
                </Link>
              ),
              label: "Home",
            },
            {
              key: "2",
              icon: (
                <Link
                  to={"/promotor-admin-panel/new-order-navigation"}
                  onClick={() => setCollapsed(true)}
                >
                  <FormOutlined />
                </Link>
              ),
              label: "New Campaign",
            },
            {
              key: "3",
              icon: (
                <Link
                  to={"/promotor-admin-panel/order-history"}
                  onClick={() => setCollapsed(true)}
                >
                  <HistoryOutlined />
                </Link>
              ),
              label: "Order History",
            },
            // {
            //   key: "4",
            //   icon: (
            //     <Link
            //       to={"/promotor-admin-panel/chat"}
            //       onClick={() => setCollapsed(true)}
            //     >
            //       <Badge
            //         badgeContent={unseenChat}
            //         color="success"
            //         style={{
            //           marginTop: ".7rem",
            //         }}
            //       >
            //         <MessageOutlined />
            //       </Badge>
            //     </Link>
            //   ),
            //   label: "Chat",
            // },
            {
              key: "5",
              icon: (
                <Link
                  to={"/promotor-admin-panel/profile"}
                  onClick={() => setCollapsed(true)}
                >
                  <AccountCircleOutlined />
                </Link>
              ),
              label: "Profile",
            },
            // {
            //   key: "4",
            //   icon: (
            //     <Link
            //       to={"/admin-panel/copyright"}
            //       onClick={() => setCollapsed(true)}
            //     >
            //       <Copyright />
            //     </Link>
            //   ),
            //   label: "Copyright",
            // },
            // {
            //   key: "7",
            //   icon: (
            //     <Link
            //       to={"/admin-panel/all-users"}
            //       onClick={() => setCollapsed(true)}
            //     >
            //       <PeopleOutlineOutlined />
            //     </Link>
            //   ),
            //   label: "Labels",
            // },
            // {
            //   key: "8",
            //   icon: (
            //     <Link
            //       to={"/admin-panel/user-queries"}
            //       onClick={() => setCollapsed(true)}
            //     >
            //       <QuestionAnswerOutlined />
            //     </Link>
            //   ),
            //   label: "Queries",
            // },
            // {
            //   key: "9",
            //   icon: (
            //     <Link
            //       to={"/admin-panel/pending-profile"}
            //       onClick={() => setCollapsed(true)}
            //     >
            //       <TimerRounded />
            //     </Link>
            //   ),
            //   label: "Pending Profiles",
            // },
            // {
            //   key: "10",
            //   icon: (
            //     <Link
            //       to={"/admin-panel/notification"}
            //       onClick={() => setCollapsed(true)}
            //     >
            //       <IoIosNotifications
            //         style={{
            //           transform: "scale(1.6)",
            //         }}
            //       />
            //     </Link>
            //   ),
            //   label: "Notifications",
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 2% 0 0",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: "fit-content",
              height: 64,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "black",
                fontSize: "1.35rem",
                fontWeight: "bold",
              }}
            >
              {" "}
              Rivaaz Films
            </span>
          </Button>

          <Dropdown menu={{ items }} trigger={["click"]}>
            <Space
              style={{
                cursor: "pointer",
                padding: "0 1rem",
              }}
            >
              <Avatar
                style={{ transform: "scale(1.3)" }}
                icon={<UserOutlined />}
              />
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "0 ",
            padding: "15px 15px 5px 15px",
            minHeight: 280,
            background: "#F5F5F5",
            borderRadius: borderRadiusLG,
            position: "relative",
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default BrandDrawerPanel;
