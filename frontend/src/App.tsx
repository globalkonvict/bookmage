import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "./context/BookContext";
import { ErrorProvider } from "./context/ErrorContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import withLayout from "./components/Layout/Layout";
import ErrorDisplay from "./components/utils/ErrorDisplay";

const App: React.FC = () => {
  return (
    <ErrorProvider>
      <AuthProvider>
        <BookProvider>
          <Router>
            <Routes>
              <Route path="/login" element={withLayout(<LoginPage />, false)} />
              <Route
                path="/register"
                element={withLayout(<RegisterPage />, false)}
              />
              <Route
                path="/dashboard"
                element={withLayout(<Dashboard />, true)}
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
            <ErrorDisplay />
          </Router>
        </BookProvider>
      </AuthProvider>
    </ErrorProvider>
  );
};

export default App;
