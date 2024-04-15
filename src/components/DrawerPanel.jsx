import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Dropdown, Space } from "antd";
import random from "../assets/images/random.webp";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import {
  AccountCircleOutlined,
  Copyright,
  HistoryOutlined,
  RestoreFromTrashOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../assets/images/logo/ready.png";
import styled from "@emotion/styled";
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

const DrawerPanel = (props) => {
  const dispatch = useDispatch();
  const page = props.page;
  const items = [
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
  };

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
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
            fontSize: "1.1rem",
          }}
          defaultSelectedKeys={defaultSelector(page)}
          items={[
            {
              key: "1",
              icon: (
                <Link
                  to={"/user-panel/home"}
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
                  to={"/user-panel/upload"}
                  onClick={() => setCollapsed(true)}
                >
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
                  onClick={() => setCollapsed(true)}
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
                  onClick={() => setCollapsed(true)}
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
                  onClick={() => setCollapsed(true)}
                >
                  <AccountCircleOutlined />
                </Link>
              ),
              label: "My Account",
            },
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
              <Avatar style={{ transform: "scale(1.3)" }} src={random} />
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
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DrawerPanel;
