import React from "react";
import { Layout, Spin } from "antd";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Navbar from "./Navbar";

const { Header, Content } = Layout;

/**
 * HOC to wrap components with layout and check if the route is protected or not
 * @param WrappedComponent - Component to wrap
 * @param isProtected - If the route is protected
 * @returns WrappedComponent with layout
 */
const withLayout = (
  WrappedComponent: React.ReactElement,
  isProtected: boolean
) => {
  const HOCComponent: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return (
        <Layout
          style={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </Layout>
      );
    }

    if (isProtected && !isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (isAuthenticated && !isProtected) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <Layout style={{ minHeight: "100vh" }}>
        {isAuthenticated && isProtected ? (
          <>
            <Header>
              <Navbar />
            </Header>
            <Layout>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Content style={{ margin: "24px 0" }}>
                  {WrappedComponent}
                </Content>
              </Layout>
            </Layout>
          </>
        ) : (
          <Layout
            style={{
              minHeight: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Content>{WrappedComponent}</Content>
          </Layout>
        )}
      </Layout>
    );
  };

  return <HOCComponent />;
};

export default withLayout;
