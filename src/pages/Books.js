import React, { useState } from "react";

import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

function Books({ books, setBooks }) {
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = (id) => {
    setBooks(
      books.filter((book) => book.id !== id)
    );

    if (editingBook?.id === id) {
      setEditingBook(null);
    }
  };

  return (
    <div>
      <h1>Book Management</h1>

      <p>
        Add, update and remove books from the
        community library.
      </p>

      <BookForm
        books={books}
        setBooks={setBooks}
        editingBook={editingBook}
        setEditingBook={setEditingBook}
      />

      <BookList
        books={books}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Books;