import React from "react";
import { AxiosError } from "axios";
import { to } from "@mrspartak/promises";
import { useNavigate } from "react-router-dom";

import AuthForm from "./AuthForm";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";
import { message } from "antd";

const Register: React.FC = () => {
  const { register } = useAuth();
  const { addError } = useError();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    const [error] = await to(register(values.email, values.password));
    const apiError = error as AxiosError<{ message?: string }>;
    if (apiError) {
      addError(apiError.response?.data?.message || "Something went wrong!");
      return;
    }
    navigate("/login");
    message.success("Registered successfully");
  };

  return <AuthForm onFinish={onFinish} buttonText="Register" />;
};

export default Register;
