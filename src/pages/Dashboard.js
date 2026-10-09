import React from "react";

function Dashboard({ books }) {
  const totalBooks = books.reduce(
    (total, book) => total + book.quantity,
    0
  );

  const totalAvailable = books.reduce(
    (total, book) => total + book.available,
    0
  );

  const lowStockBooks = books.filter(
    (book) => book.available < 2
  );

  return (
    <div>
      <h1>Library Dashboard</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Book Titles</h3>
          <p>{books.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Copies</h3>
          <p>{totalBooks}</p>
        </div>

        <div className="dashboard-card">
          <h3>Available Copies</h3>
          <p>{totalAvailable}</p>
        </div>

        <div className="dashboard-card low-stock-card">
          <h3>Low Stock</h3>
          <p>{lowStockBooks.length}</p>
        </div>

      </div>

      <h2>Book Availability</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Total</th>
              <th>Available</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                className={
                  book.available < 2
                    ? "low-stock"
                    : ""
                }
              >
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.quantity}</td>
                <td>{book.available}</td>
                <td>
                  {book.available < 2
                    ? "Low Stock"
                    : "Available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;