import React from "react";

function TransactionList({ transactions }) {
  return (
    <div className="list-card">
      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions have been recorded yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions
                .slice()
                .reverse()
                .map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.bookTitle}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;