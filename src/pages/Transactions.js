import React from "react";

import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

function Transactions({
  books,
  setBooks,
  transactions,
  setTransactions
}) {
  return (
    <div>
      <h1>Transactions</h1>

      <p>
        Manage book borrowing, stock additions and transaction history.
      </p>

      <TransactionForm
        books={books}
        setBooks={setBooks}
        transactions={transactions}
        setTransactions={setTransactions}
      />

      <TransactionList
        transactions={transactions}
      />
    </div>
  );
}

export default Transactions;