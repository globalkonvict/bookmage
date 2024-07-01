import React, { useEffect } from "react";
import BookList from "../components/Book/BookList";
import useAuth from "../hooks/useAuth";
import useBooks from "../hooks/useBooks";

/**
 * Dashboard page
 * @returns Dashboard page
 * */
const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { fetchBooks } = useBooks();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isAuthenticated, fetchBooks]);

  return (
    <>
      <BookList />
    </>
  );
};

export default Dashboard;
