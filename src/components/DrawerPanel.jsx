import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { Dropdown, Space } from "antd";
import random from "../assets/images/random.webp";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import { HistoryOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const DrawerPanel = (props) => {
  const page = props.page;
  const items = [
    {
      label: "3rd menu item",
      key: "0",
    },
    {
      label: "3rd menu item",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  const defaultSelector = (page) => {
    if (page === "home") {
      return ["1"];
    }
    if (page === "history") {
      return ["2"];
    }
  };

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={defaultSelector(page)}
          items={[
            {
              key: "1",
              icon: (
                <Link to={"/user-panel/home"}>
                  <UploadOutlined style={{ transform: "scale(1.1)" }} />
                </Link>
              ),
              label: "Upload",
            },
            {
              key: "2",
              icon: (
                <Link to={"/user-panel/history"}>
                  <HistoryOutlined style={{ transform: "scale(1.1)" }} />
                </Link>
              ),
              label: "History",
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
