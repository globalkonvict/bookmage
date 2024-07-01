import React, { useEffect } from "react";
import { message } from "antd";
import useError from "../../hooks/useError";

/**
 * The ErrorDisplay component listens for errors in the ErrorContext and displays them using the message.error method from the antd library.
 * The component uses the useError hook to access the error state and removeError function from the ErrorContext.
 * When an error is added to the state, the component displays it as a message for 3 seconds and then removes it from the state.
 * This allows the user to see the error message and then dismiss it after a short period of time.
 * @returns null
 */
const ErrorDisplay: React.FC = () => {
  const { state, removeError } = useError();

  useEffect(() => {
    state.errors.forEach((error) => {
      message.error(error, 3, () => removeError(error));
    });
  }, [state.errors, removeError]);

  return null;
};

export default ErrorDisplay;
