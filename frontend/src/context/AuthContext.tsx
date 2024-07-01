import { createContext, useState, useEffect, ReactNode } from "react";
import {
  login as loginService,
  register as registerService,
} from "../services/authService";

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/*
 * AuthProvider is a component that wraps the application and provides the authentication context.
 * It provides the following values to the context:
 * - isAuthenticated: a boolean value that indicates if the user is authenticated.
 * - loading: a boolean value that indicates if the authentication state is being loaded.
 * - login: a function that logs in the user with the given email and password.
 * - register: a function that registers the user with the given email and password.
 * - logout: a function that logs out the user.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const token = await loginService(email, password);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string) => {
    const token = await registerService(email, password);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
