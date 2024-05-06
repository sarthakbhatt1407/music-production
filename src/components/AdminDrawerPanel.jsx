import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Dropdown, Space } from "antd";
import random from "../assets/images/random.webp";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import {
  AccountCircleOutlined,
  Copyright,
  HistoryOutlined,
  LibraryMusicOutlined,
  PeopleOutlineOutlined,
  RestoreFromTrashOutlined,
  WorkHistoryOutlined,
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
      label: <Link to={"/admin-panel/all-users"}>Labels</Link>,
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
    if (page === "orders") {
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
    if (page === "pending-work") {
      return ["6"];
    }
    if (page === "all-users") {
      return ["7"];
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
            // {
            //   key: "1",
            //   icon: (
            //     <Link
            //       to={"/admin-panel/home"}
            //       onClick={() => setCollapsed(true)}
            //     >
            //       <HomeOutlined />
            //     </Link>
            //   ),
            //   label: "Home",
            // },
            {
              key: "2",
              icon: (
                <Link
                  to={"/admin-panel/orders"}
                  onClick={() => setCollapsed(true)}
                >
                  <LibraryMusicOutlined />
                </Link>
              ),
              label: "Orders",
            },
            {
              key: "6",
              icon: (
                <Link
                  to={"/admin-panel/pending-work"}
                  onClick={() => setCollapsed(true)}
                >
                  <WorkHistoryOutlined />
                </Link>
              ),
              label: "Pending",
            },
            {
              key: "3",
              icon: (
                <Link
                  to={"/admin-panel/history"}
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
                  to={"/admin-panel/copyright"}
                  onClick={() => setCollapsed(true)}
                >
                  <Copyright />
                </Link>
              ),
              label: "Copyright",
            },
            {
              key: "7",
              icon: (
                <Link
                  to={"/admin-panel/all-users"}
                  onClick={() => setCollapsed(true)}
                >
                  <PeopleOutlineOutlined />
                </Link>
              ),
              label: "Labels",
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
export default DrawerPanel;
