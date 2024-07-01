import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Card, Flex, Typography } from "antd";

type AuthFormProps = {
  onFinish: (values: { email: string; password: string }) => void;
  buttonText: string;
};

const AuthForm: React.FC<AuthFormProps> = ({ onFinish, buttonText }) => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100vh", width: "100%" }}
    >
      <Card style={{ width: 300 }}>
        <Flex justify="center" align="center" vertical>
          <Typography.Title level={3}>{buttonText}</Typography.Title>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please input a valid email!" },
              ]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                {buttonText}
              </Button>
            </Form.Item>
          </Form>
          <Link to={buttonText === "Login" ? "/register" : "/login"}>
            {buttonText === "Login" ? "Register" : "Login"} instead
          </Link>
        </Flex>
      </Card>
    </Flex>
  );
};

export default AuthForm;
