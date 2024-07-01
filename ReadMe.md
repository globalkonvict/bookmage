# Book Management Web Application

## Project Overview

This project is a simple web application for managing a list of books. It includes functionalities for user authentication, CRUD operations for books, and a main dashboard to view the list of books. The frontend is built using ReactJS, with state management handled by `useContext()`, and static type checking provided by TypeScript. Ant Design is used for the UI components and form handling, including input validation.

## Features

1. **Authentication**:

   - Users can log in with their email and password.
   - Users can register for a new account with a unique email and password.
   - After login, users are redirected to the main dashboard page.

2. **Main Dashboard Page**:

   - Displays a paginated list of books with sorting capabilities.
   - Each book has properties like title, author, publication year, and genre.
   - The list is initially populated with some dummy data.

3. **CRUD Operations**:
   - Users can create, read, update, and delete books.
   - A form is provided to add new books, with input validation using Ant Design's form API.
   - Users can edit book details through an edit form.
   - A delete button allows users to remove books from the list.

## Implementation Details

### Technologies Used

- **Frontend**: ReactJS, TypeScript, Ant Design
- **State Management**: `useContext()`
- **Form Handling and Validation**: Ant Design's form API
- **UI Components**: Ant Design

### Setup and Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/globalkonvict/bookmage
   cd bookmage
   ```

2. **Install Dependencies**:

   ```sh
   npm install // first in root then in the frontend directory
   ```

3. **Run the Application**:
   ```sh
   npm run together // this will run the backend and frontend project together
   ```
4. **Visit Localhost:3000**
   ```sh
   Open-> http://localhost:3000/ in your browser
   ```

**Default Credential For Login:** 

User: sarthak@gmail.com
Pass: qwerty


### Backend API (Optional)

An optional backend API has been implemented for user authentication and book management.

### Commit Messages

Each functionality is implemented as a separate commit with clear and descriptive commit messages. This ensures that the development process is transparent and easy to follow.

### Evaluation Criteria

- Successful implementation of user authentication using email and password.
- CRUD operations for managing the list of books.
- Proper usage of ReactJS, `useContext()`, Ant Design, and TypeScript.
- Proper implementation of pagination and sorting functionalities.
- Well-documented code with clear commit messages.

## Conclusion

This project provides a solution for managing a list of books, with a focus on user authentication, CRUD operations, and an user interface. By following the setup instructions, you can easily run the project locally and explore its features.

---

**Repository Link**: [Your GitHub Repository Link](https://github.com/globalkonvict/bookmage)

---
