import React from "react";
import { to } from "@mrspartak/promises";
import { useNavigate } from "react-router-dom";

import AuthForm from "./AuthForm";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";

const Login: React.FC = () => {
  const { login } = useAuth();
  const { addError } = useError();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    const [error] = await to(login(values.email, values.password));
    if (error) {
      addError("Invalid email or password");
      return;
    }
    navigate("/dashboard");
  };

  return <AuthForm onFinish={onFinish} buttonText="Login" />;
};

export default Login;
