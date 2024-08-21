import { Button, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const MainLayout = () => {
  const navigate = useNavigate();
  const location  = useLocation();
  console.log(location);
  const [path,setPath] = useState()
  useEffect(()=>{
    setPath(location?.pathname)
  },[location])
  console.log(path)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} width={250} breakpoint="lg">
        <div className="demo-logo-vertical h-20 bg-blue-300" />
        <Menu
          theme="dark"
          mode="inline"
          style={{ marginTop: 10 }}
          onClick={(e) => {
            e?.key === "1" ? navigate("/") : navigate("compare");
          }}
          defaultSelectedKeys={[path === "/compare" ? "2" : "1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Product Details",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Compare Products",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            //   icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflowY: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
