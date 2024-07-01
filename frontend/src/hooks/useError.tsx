import { useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";

/*
 * useError is a custom hook that returns the error context.
 * It throws an error if it is used outside of the ErrorProvider.
 */
const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

export default useError;
