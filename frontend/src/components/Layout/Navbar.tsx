import React from "react";
import useAuth from "../../hooks/useAuth";
import { Menu, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
      <Typography.Title level={4} style={{ color: "white", margin: 0 }}>
        BookManager
      </Typography.Title>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{
          width: "clamp(10px, 30%, 200px)",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Menu.Item key="1" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Flex>
  );
};

export default Navbar;
