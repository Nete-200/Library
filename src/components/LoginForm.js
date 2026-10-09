import React, { useState } from "react";

function LoginForm({ users }) {
  const [membershipId, setMembershipId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = users.find(
      (item) =>
        item.membershipId.toLowerCase() ===
        membershipId.trim().toLowerCase()
    );

    if (user) {
      setMessage(
        `Welcome, ${user.name}! You are logged in as ${user.role}.`
      );
    } else {
      setMessage("User not found. Please check your membership ID.");
    }
  };

  return (
    <div className="form-card">
      <h2>Library Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Membership ID</label>

          <input
            type="text"
            value={membershipId}
            onChange={(event) =>
              setMembershipId(event.target.value)
            }
            placeholder="Enter membership ID"
          />
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="primary-button"
          >
            Login
          </button>
        </div>
      </form>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}
    </div>
  );
}

export default LoginForm;