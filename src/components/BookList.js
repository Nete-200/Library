import React from "react";

function BookList({ books, onEdit, onDelete }) {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="list-card">
      <h2>Library Books</h2>

      {books.length === 0 ? (
        <p>No books have been added yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Total</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>{book.quantity}</td>

                  <td
                    className={
                      book.available < 2
                        ? "low-stock-text"
                        : ""
                    }
                  >
                    {book.available}
                  </td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() => onEdit(book)}
                    >
                      Update
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookList;