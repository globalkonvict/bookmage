const { readDB, writeDB } = require("../utils/db");
const Book = require("../models/Book");
const { v4: uuidv4 } = require("uuid");

// Get all books
const getBooks = (req, res) => {
  const db = readDB();
  const books = db.books.filter((book) => book.userId === req.user.id);
  res.json(books);
};

// Create a new book
const createBook = (req, res) => {
  const { title, author, year, genre } = req.body;
  const db = readDB();
  const book = new Book(uuidv4(), req.user.id, title, author, year, genre);
  db.books.push(book);
  writeDB(db);
  res.status(201).json(book);
};

// Update a book
const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, year, genre } = req.body;
  const db = readDB();

  const bookIndex = db.books.findIndex(
    (book) => book.id === id && book.userId === req.user.id
  );
  if (bookIndex === -1)
    return res.status(404).json({ message: "Book not found" });

  db.books[bookIndex] = { ...db.books[bookIndex], title, author, year, genre };
  writeDB(db);
  res.json(db.books[bookIndex]);
};

// Delete a book
const deleteBook = (req, res) => {
  const { id } = req.params;
  const db = readDB();

  const bookIndex = db.books.findIndex(
    (book) => book.id === id && book.userId === req.user.id
  );
  if (bookIndex === -1)
    return res.status(404).json({ message: "Book not found" });

  db.books.splice(bookIndex, 1);
  writeDB(db);
  res.status(204).send();
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
