import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Table,
  Button,
  Modal,
  Input,
  Space,
  DatePicker,
  Row,
  Col,
  Form,
  Card,
  Select,
  Popconfirm,
  TableProps,
  PaginationProps,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  FileAddOutlined,
  EditOutlined,
} from "@ant-design/icons";
import useBooks from "../../hooks/useBooks";
import BookForm from "./BookForm";
import { Book } from "../../types";

const { RangePicker } = DatePicker;
const { Option } = Select;

const BookList: React.FC = () => {
  const { books, deleteBook, deleteBooks } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [fromYear, setFromYear] = useState<number | undefined>(undefined);
  const [toYear, setToYear] = useState<number | undefined>(undefined);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const current = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;
  const pageSize = localStorage.getItem("pageSize")
    ? parseInt(localStorage.getItem("pageSize")!, 10)
    : 10;
  const [pagination, setPagination] = useState<PaginationProps>({
    current,
    pageSize,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"],
    showTotal: (total) => `Total Books: ${total}`,
    showLessItems: true,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleYearChange = (dates: any, dateStrings: [string, string]) => {
    setFromYear(dateStrings[0] ? parseInt(dateStrings[0]) : undefined);
    setToYear(dateStrings[1] ? parseInt(dateStrings[1]) : undefined);
  };

  const handleGenreChange = (value: string[]) => {
    setSelectedGenres(value);
  };

  const uniqueGenres = useMemo(() => {
    const genres = books.map((book) => book.genre);
    return Array.from(new Set(genres));
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        (searchText === "" ||
          book.title.toLowerCase().includes(searchText.toLowerCase()) ||
          book.author.toLowerCase().includes(searchText.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchText.toLowerCase())) &&
        (fromYear === undefined || book.year >= fromYear) &&
        (toYear === undefined || book.year <= toYear) &&
        (selectedGenres.length === 0 || selectedGenres.includes(book.genre))
    );
  }, [books, searchText, fromYear, toYear, selectedGenres]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) =>
      setSelectedRowKeys(selectedRowKeys),
  };

  const handleBatchDelete = () => {
    deleteBooks(selectedRowKeys as string[]);
    setSelectedRowKeys([]);
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
    setSearchParams({
      page: pagination.current.toString(),
      pageSize: pagination.pageSize.toString(),
    });
    localStorage.setItem("pageSize", pagination.pageSize.toString());
  };

  const columns: TableProps<Book>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Book, b: Book) => a.title.localeCompare(b.title),
      ellipsis: true,
      width: "clamp(100px, 50%, 300px)",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      sorter: (a: Book, b: Book) => a.author.localeCompare(b.author),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a: Book, b: Book) => a.year - b.year,
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Book) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => setEditingBook(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Do you want to delete this book?"
            description="This action is irreversible!"
            onConfirm={() => deleteBook(record.id!)}
          >
            <Button icon={<DeleteOutlined />} danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current,
      pageSize,
    }));
  }, [current, pageSize]);

  const tableTitle = () => (
    <Row justify="space-between" align="middle">
      <Col>
        <h2>Books</h2>
      </Col>
      <Col>
        <Space>
          {selectedRowKeys.length > 0 && (
            <Popconfirm
              title="Do you want to delete the selected books?"
              description="This action is irreversible!"
              onConfirm={handleBatchDelete}
            >
              <Button danger size="large" icon={<DeleteOutlined />}>
                Delete Selected
              </Button>
            </Popconfirm>
          )}
          <Button
            type="primary"
            size="large"
            icon={<FileAddOutlined />}
            onClick={() =>
              setEditingBook({
                title: "",
                author: "",
                year: new Date().getFullYear(),
                genre: "",
              })
            }
          >
            Add Book
          </Button>
        </Space>
      </Col>
    </Row>
  );

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Search">
                <Input
                  placeholder="Search by title, author, or genre"
                  value={searchText}
                  onChange={handleSearch}
                  suffix={<SearchOutlined />}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Year">
                <RangePicker
                  picker="year"
                  onChange={handleYearChange}
                  format="YYYY"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Genre">
                <Select
                  mode="multiple"
                  placeholder="Select genre(s)"
                  onChange={handleGenreChange}
                  allowClear
                  size="large"
                  style={{ width: "100%" }}
                >
                  {uniqueGenres.map((genre) => (
                    <Option key={genre} value={genre}>
                      {genre}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={filteredBooks}
          rowKey={(record) => record.id!}
          pagination={pagination}
          rowSelection={rowSelection}
          onChange={handleTableChange}
          title={tableTitle}
          scroll={{ x: 768 }}
        />
      </Card>

      <Modal
        title={editingBook ? "Edit Book" : "Add Book"}
        open={!!editingBook}
        onCancel={() => setEditingBook(undefined)}
        footer={null}
      >
        <BookForm
          book={editingBook}
          onClose={() => setEditingBook(undefined)}
        />
      </Modal>
    </Space>
  );
};

export default BookList;
