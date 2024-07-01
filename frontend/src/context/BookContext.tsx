import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { to } from "@mrspartak/promises";
import message from "antd/lib/message";
import api from "../services/api";
import { Book } from "../types";
import useError from "../hooks/useError";

type BookContextType = {
  books: Book[];
  fetchBooks: () => void;
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  deleteBooks: (ids: string[]) => void;
};

export const BookContext = createContext<BookContextType | undefined>(
  undefined
);

/*
 * BookProvider is a component that wraps the application and provides the book context.
 * It provides the following values to the context:
 * - books: an array of books.
 * - fetchBooks: a function that fetches the books from the server.
 * - addBook: a function that adds a book to the list of books.
 * - updateBook: a function that updates a book in the list of books.
 * - deleteBook: a function that deletes a book from the list of books.
 * - deleteBooks: a function that deletes multiple books from the list of books.
 */
export const BookProvider = ({ children }: { children: ReactNode }) => {
  const { addError } = useError();
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const [error, response] = await to(api.get("/api/books"));
    if (error) {
      addError("Failed to fetch books");
    } else {
      setBooks(response?.data || []);
    }
  }, [addError]);

  const addBook = useCallback(
    async (book: Book) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const [error, response] = await to(api.post("/api/books", book));
      if (error) {
        addError("Failed to add book");
      } else {
        setBooks((prevBooks) => [...prevBooks, response?.data]);
        message.success("Book added successfully");
      }
    },
    [addError]
  );

  const updateBook = useCallback(
    async (book: Book) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const [error] = await to(api.put(`/api/books/${book.id}`, book));
      if (error) {
        addError("Failed to update book");
      } else {
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === book.id ? book : b))
        );
        message.success("Book updated successfully");
      }
    },
    [addError]
  );

  const deleteBook = useCallback(
    async (id: string) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const [error] = await to(api.delete(`/api/books/${id}`));
      if (error) {
        addError("Failed to delete book");
      } else {
        setBooks((prevBooks) => prevBooks.filter((b) => b.id !== id));
        message.success("Book deleted successfully");
      }
    },
    [addError]
  );

  const deleteBooks = useCallback(
    async (ids: string[]) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const [error] = await to(
        Promise.all(ids.map((id) => api.delete(`/api/books/${id}`)))
      );
      if (error) {
        addError("Failed to delete books");
      } else {
        setBooks((prevBooks) => prevBooks.filter((b) => !ids.includes(b.id!)));
        message.success(`Deleted ${ids.length} books successfully`);
      }
    },
    [addError]
  );

  // Memoize the value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      books,
      fetchBooks,
      addBook,
      updateBook,
      deleteBook,
      deleteBooks,
    }),
    [books, fetchBooks, addBook, updateBook, deleteBook, deleteBooks]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
