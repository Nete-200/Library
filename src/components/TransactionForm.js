import React, { useState } from "react";

function TransactionForm({ books, setBooks, transactions, setTransactions }) {
  const [bookId, setBookId] = useState("");
  const [type, setType] = useState("Borrow");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!bookId) {
      setError("Please select a book.");
      return;
    }

    const amount = Number(quantity);

    if (!Number.isInteger(amount) || amount <= 0) {
      setError("Quantity must be a whole number greater than 0.");
      return;
    }

    const selectedBook = books.find(
      (book) => book.id === Number(bookId)
    );

    if (!selectedBook) {
      setError("Book not found.");
      return;
    }

    if (type === "Borrow" && selectedBook.available < amount) {
      setError("Not enough copies available.");
      return;
    }

    const updatedBooks = books.map((book) => {
      if (book.id === selectedBook.id) {
        return {
          ...book,
          available:
            type === "Borrow"
              ? book.available - amount
              : book.available + amount,
          quantity:
            type === "Borrow"
              ? book.quantity
              : book.quantity + amount
        };
      }

      return book;
    });

    const newTransaction = {
      id: Date.now(),
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      type: type,
      quantity: amount,
      date: new Date().toLocaleString()
    };

    setBooks(updatedBooks);
    setTransactions([...transactions, newTransaction]);

    setBookId("");
    setType("Borrow");
    setQuantity(1);

    setMessage("Transaction completed successfully.");
  };

  return (
    <div className="form-card">
      <h2>Stock Transaction</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book</label>

          <select
            value={bookId}
            onChange={(event) => setBookId(event.target.value)}
          >
            <option value="">Select a book</option>

            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} - Available: {book.available}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Transaction Type</label>

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="Borrow">Borrow</option>
            <option value="Add Stock">Add Stock</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="primary-button"
          >
            Complete Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;