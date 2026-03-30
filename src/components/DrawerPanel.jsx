import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Dropdown, Space } from "antd";
import random from "../assets/images/random.webp";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import {
  AccountCircleOutlined,
  Copyright,
  DocumentScannerOutlined,
  HistoryOutlined,
  NotificationsNoneOutlined,
  RestoreFromTrashOutlined,
  Wallet,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/logo/ready.png";
import styled from "@emotion/styled";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";
import { Badge } from "@mui/material";
import { FaWallet } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import MusicLoader from "./Loader/MusicLoader";
const { Header, Sider, Content } = Layout;

const MobileSider = styled(Sider)`
  @media only screen and (max-width: 768px) {
    position: fixed !important;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    transform: ${(props) =>
      props.collapsed ? "translateX(-100%)" : "translateX(0)"};
    transition: transform 0.3s ease-in-out;
    width: 250px !important;
    min-width: 250px !important;
    max-width: 250px !important;
  }
`;

const MobileOverlay = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: ${(props) => (props.show ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const ResponsiveLayout = styled(Layout)`
  @media only screen and (max-width: 768px) {
    margin-left: 0 !important;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  img {
    width: 2rem;
  }
`;
const Para = styled.p`
  margin: "0 1rem";
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: capitalize;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    font-size: 1rem;
  }
`;

const DrawerPanel = (props) => {
  const adminView = useSelector((state) => state.adminView);
  console.log(adminView);

  const dispatch = useDispatch();
  const page = props.page;
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const demoHandleVerifyOtp = async () => {
    setIsLoading(true);

    const mob = "8126770620";

    if (true) {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/check-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactNum: mob,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.exists) {
        const loginRes = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: mob,
            }),
          }
        );
        const loginData = await loginRes.json();
        console.log(loginData);

        // 9927321330
        if (loginData.isloggedIn) {
          setTimeout(() => {
            if (!loginData.user.isAdmin) {
              dispatch({
                type: "log in",
                data: { ...loginData, type: "music-user" },
              });
              navigate("/user-panel/home");
            }
            if (loginData.user.isAdmin) {
              dispatch({
                type: "log in",
                data: { ...loginData, type: "music-admin" },
              });
              navigate("/admin-panel/all-users");
            }
          }, 1000);
        }
      } else {
        navigate("/register", {
          state: {
            contactNum: mobile,
          },
        });
      }
      setNotification({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
    setIsLoading(false);
  };
  const items = adminView
    ? [
        {
          label: <Link to={"/user-panel/profile"}>My Account</Link>,
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
                navigate("/login");
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
                demoHandleVerifyOtp();
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
          label: <Link to={"/user-panel/profile"}>My Account</Link>,
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
                navigate("/login");
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
    if (page === "upload") {
      return ["2"];
    }
    if (page === "history") {
      return ["3"];
    }
    if (page === "copyright") {
      return ["4"];
    }
    if (page === "profile") {
      return ["5"];
    }

    if (page === "reports") {
      return ["6"];
    }
    if (page === "notification") {
      return ["7"];
    }
    if (page === "wallet") {
      return ["8"];
    }
  };
  const userId = useSelector((state) => state.userId);
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userData, setUserdata] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [noti, setNoti] = useState(null);
  const fetcher = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/notification/get-all`
    );
    const data = await res.json();

    if (data.success) {
      setNoti(data.notifications.reverse());
    }
    const resUser = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/get-user/?id=${userId}`
    );
    const dataUser = await resUser.json();

    if (resUser.ok) {
      setUserdata(dataUser.user);
    }
  };
  useEffect(() => {
    fetcher();
    const intv = setInterval(() => {
      fetcher();
    }, 20000);

    // Handle window resize for mobile detection
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true); // Always start collapsed on mobile
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intv);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle mobile menu click
  const handleMobileMenuClick = () => {
    if (isMobile) {
      setCollapsed(true); // Close menu when clicking a link on mobile
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {isLoading && <MusicLoader />}

      {/* Mobile Overlay */}
      <MobileOverlay
        show={!collapsed && isMobile}
        onClick={() => setCollapsed(true)}
      />

      <MobileSider
        trigger={null}
        collapsible
        collapsed={isMobile ? collapsed : collapsed}
      >
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
            fontSize: "1.1rem",
          }}
          defaultSelectedKeys={defaultSelector(page)}
          items={[
            {
              key: "1",
              icon: (
                <Link to={"/user-panel/home"} onClick={handleMobileMenuClick}>
                  <HomeOutlined />
                </Link>
              ),
              label: "Home",
            },
            {
              key: "2",
              icon: (
                <Link to={"/user-panel/upload"} onClick={handleMobileMenuClick}>
                  <UploadOutlined />
                </Link>
              ),
              label: "Upload",
            },
            {
              key: "3",
              icon: (
                <Link
                  to={"/user-panel/history"}
                  onClick={handleMobileMenuClick}
                >
                  <HistoryOutlined />
                </Link>
              ),
              label: "History",
            },
            {
              key: "4",
              icon: (
                <Link
                  to={"/user-panel/copyright"}
                  onClick={handleMobileMenuClick}
                >
                  <Copyright />
                </Link>
              ),
              label: "Copyright",
            },

            {
              key: "5",
              icon: (
                <Link
                  to={"/user-panel/profile"}
                  onClick={handleMobileMenuClick}
                >
                  <AccountCircleOutlined />
                </Link>
              ),
              label: "My Account",
            },
            {
              key: "6",
              icon: (
                <Link
                  to={"/user-panel/reports"}
                  onClick={handleMobileMenuClick}
                >
                  <SiMicrosoftexcel
                    style={{
                      transform: "scale(1.2)",
                    }}
                  />
                </Link>
              ),
              label: "Reports",
            },
            {
              key: "7",
              icon: (
                <Link
                  to={"/user-panel/notification"}
                  onClick={handleMobileMenuClick}
                >
                  <Badge
                    badgeContent={noti ? noti.length : 0}
                    color="success"
                    style={{
                      marginTop: ".7rem",
                    }}
                  >
                    <NotificationsNoneOutlined />
                  </Badge>
                </Link>
              ),
              label: "Notifications",
            },
            {
              key: "8",
              icon: (
                <Link to={"/user-panel/wallet"} onClick={handleMobileMenuClick}>
                  <IoWalletOutline
                    style={{
                      transform: "scale(1.2)",
                    }}
                  />
                </Link>
              ),
              label: "Wallet",
            },
          ]}
        />
      </MobileSider>

      <ResponsiveLayout>
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
      </ResponsiveLayout>
    </Layout>
  );
};
export default DrawerPanel;
