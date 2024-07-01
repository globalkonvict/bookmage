import { useContext } from "react";
import { BookContext } from "../context/BookContext";

/*
 * useBooks is a custom hook that returns the book context.
 * It throws an error if it is used outside of the BookProvider.
 */
const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};

export default useBooks;
