const express = require("express");
const router = express.Router();
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");
const Joi = require("joi");

const bookSchemaObj = {
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
};

const updateBookSchemaObj = {
  ...bookSchemaObj,
  id: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
};

const bookSchema = Joi.object(bookSchemaObj);

const updateBookSchema = Joi.object(updateBookSchemaObj);

router.get("/", authMiddleware, getBooks);
router.post("/", authMiddleware, validationMiddleware(bookSchema), createBook);
router.put(
  "/:id",
  authMiddleware,
  validationMiddleware(updateBookSchema),
  updateBook
);
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
