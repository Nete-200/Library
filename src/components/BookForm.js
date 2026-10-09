import React, { useEffect, useState } from "react";

function BookForm({ books, setBooks, editingBook, setEditingBook }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    quantity: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        genre: editingBook.genre,
        isbn: editingBook.isbn,
        quantity: editingBook.quantity
      });
    } else {
      setFormData({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        quantity: ""
      });
    }

    setError("");
  }, [editingBook]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.genre.trim() ||
      !formData.isbn.trim() ||
      formData.quantity === ""
    ) {
      setError("Please complete all fields.");
      return;
    }

    const quantity = Number(formData.quantity);

    if (quantity < 0 || !Number.isInteger(quantity)) {
      setError("Quantity must be a whole number of 0 or more.");
      return;
    }

    if (editingBook) {
      const updatedBooks = books.map((book) =>
        book.id === editingBook.id
          ? {
              ...book,
              title: formData.title.trim(),
              author: formData.author.trim(),
              genre: formData.genre.trim(),
              isbn: formData.isbn.trim(),
              quantity: quantity,
              available: Math.min(
                book.available,
                quantity
              )
            }
          : book
      );

      setBooks(updatedBooks);
      setEditingBook(null);
    } else {
      const newBook = {
        id: Date.now(),
        title: formData.title.trim(),
        author: formData.author.trim(),
        genre: formData.genre.trim(),
        isbn: formData.isbn.trim(),
        quantity: quantity,
        available: quantity
      };

      setBooks([...books, newBook]);
    }

    setFormData({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      quantity: ""
    });

    setError("");
  };

  const handleCancel = () => {
    setEditingBook(null);

    setFormData({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      quantity: ""
    });

    setError("");
  };

  return (
    <div className="form-card">
      <h2>{editingBook ? "Update Book" : "Add New Book"}</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g. Fiction"
          />
        </div>

        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Enter ISBN"
          />
        </div>

        <div className="form-group">
          <label>Initial Quantity</label>
          <input
            type="number"
            name="quantity"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="primary-button">
            {editingBook ? "Update Book" : "Add Book"}
          </button>

          {editingBook && (
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

export default BookForm;