import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker } from "antd";

import useBooks from "../../hooks/useBooks";
import { Book } from "../../types";

type BookFormProps = {
  book?: Book;
  onClose: () => void;
};

const BookForm: React.FC<BookFormProps> = ({ book, onClose }) => {
  const { addBook, updateBook } = useBooks();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const bookData = {
      ...values,
      year: values.year.year(),
    };
    if (book && book.id) {
      await updateBook({ ...book, ...bookData });
    } else {
      await addBook(bookData);
    }
    onClose();
  };

  useEffect(() => {
    if (book) {
      form.setFieldsValue({
        ...book,
        year: dayjs(String(book.year)),
      });
    } else {
      form.resetFields();
    }
  }, [book, form]);

  return (
    <Form
      form={form}
      initialValues={{
        title: "",
        author: "",
        year: dayjs(),
        genre: "",
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        rules={[
          { required: true, message: "Please input the title!" },
          { type: "string", message: "Title must be a string!" },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="author"
        rules={[
          { required: true, message: "Please input the author!" },
          { type: "string", message: "Author must be a string!" },
        ]}
      >
        <Input placeholder="Author" />
      </Form.Item>
      <Form.Item
        name="year"
        rules={[
          { required: true, message: "Please input the publication year!" },
        ]}
      >
        <DatePicker picker="year" format="YYYY" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="genre"
        rules={[
          { required: true, message: "Please input the genre!" },
          { type: "string", message: "Genre must be a string!" },
          {
            pattern: /^[^\s,]+$/,
            message: "Genre must be a single term without commas!",
          },
        ]}
      >
        <Input placeholder="Genre" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {book?.id ? "Update" : "Add"} Book
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookForm;
