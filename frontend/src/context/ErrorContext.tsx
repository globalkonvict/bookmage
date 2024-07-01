import { createContext, useReducer, ReactNode } from "react";

type ErrorState = {
  errors: string[];
}

const initialState: ErrorState = {
  errors: [],
};

type Action =
  | { type: "ADD_ERROR"; payload: string }
  | { type: "REMOVE_ERROR"; payload: string }
  | { type: "CLEAR_ERRORS" };

const errorReducer = (state: ErrorState, action: Action): ErrorState => {
  switch (action.type) {
    case "ADD_ERROR":
      if (state.errors.includes(action.payload)) {
        return state;
      }
      return { errors: [...state.errors, action.payload] };
    case "REMOVE_ERROR":
      return {
        errors: state.errors.filter((error) => error !== action.payload),
      };
    case "CLEAR_ERRORS":
      return { errors: [] };
    default:
      return state;
  }
};

type ErrorContextType = {
  state: ErrorState;
  addError: (error: string) => void;
  removeError: (error: string) => void;
  clearErrors: () => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined
);

/**
 * ErrorProvider is a component that wraps the application and provides the error context.
 * It provides the following values to the context:
 * - state: an object containing the list of errors.
 * - addError: a function that adds an error to the list of errors.
 * - removeError: a function that removes an error from the list of errors.
 * - clearErrors: a function that clears all errors from the list.
 */
export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  const addError = (error: string) => {
    dispatch({ type: "ADD_ERROR", payload: error });
  };

  const removeError = (error: string) => {
    dispatch({ type: "REMOVE_ERROR", payload: error });
  };

  const clearErrors = () => {
    dispatch({ type: "CLEAR_ERRORS" });
  };

  return (
    <ErrorContext.Provider
      value={{ state, addError, removeError, clearErrors }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
