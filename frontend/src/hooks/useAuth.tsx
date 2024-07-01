import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/*
 * useAuth is a custom hook that returns the authentication context.
 * It throws an error if it is used outside of the AuthProvider.
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
