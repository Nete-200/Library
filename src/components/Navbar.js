import React from "react";
import { Link } from "react-router-dom";

function Navbar({ loggedInUser }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        📚 Community Library
      </div>

      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/books">Books</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/users">Users</Link>

        <span className="user-info">
          {loggedInUser.name} ({loggedInUser.role})
        </span>
      </div>
    </nav>
  );
}

export default Navbar;