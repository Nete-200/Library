import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";

import Auth from "./components/Auth";

import useLocalStorage from "./hooks/useLocalStorage";
import {
  initialBooks,
  initialUsers,
  initialTransactions
} from "./data/initialData";

import "./App.css";

function App() {
  const [books, setBooks] = useLocalStorage(
    "libraryBooks",
    initialBooks
  );

  const [users, setUsers] = useLocalStorage(
    "libraryUsers",
    initialUsers
  );

  const [transactions, setTransactions] = useLocalStorage(
    "libraryTransactions",
    initialTransactions
  );

  const [loggedInUser, setLoggedInUser] = useLocalStorage(
    "loggedInUser",
    null
  );

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  if (!loggedInUser) {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Auth
                users={users}
                setUsers={setUsers}
                onLogin={setLoggedInUser}
              />
            }
          />

          <Route
            path="/register"
            element={
              <Auth
                users={users}
                setUsers={setUsers}
                onLogin={setLoggedInUser}
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate to="/login" replace />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar loggedInUser={loggedInUser} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard books={books} />
            }
          />

          <Route
            path="/books"
            element={
              <Books
                books={books}
                setBooks={setBooks}
              />
            }
          />

          <Route
            path="/transactions"
            element={
              <Transactions
                books={books}
                setBooks={setBooks}
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />

          <Route
            path="/users"
            element={
              <Users
                users={users}
                setUsers={setUsers}
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate to="/" replace />
            }
          />
        </Routes>
      </main>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </BrowserRouter>
  );
}

export default App;