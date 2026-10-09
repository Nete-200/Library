import React, { useState } from "react";

function Auth({ users, setUsers, onLogin }) {
  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [loginId, setLoginId] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!name.trim() || !membershipId.trim()) {
      setError("Please complete all fields.");
      return;
    }

    const exists = users.some(
      (user) =>
        user.membershipId.toLowerCase() ===
        membershipId.trim().toLowerCase()
    );

    if (exists) {
      setError("This membership ID already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      membershipId: membershipId.trim(),
      role: "Member"
    };

    setUsers([...users, newUser]);

    setName("");
    setMembershipId("");

    setMessage("Account created successfully. Please login.");
    setMode("login");
  };

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    const user = users.find(
      (item) =>
        item.membershipId.toLowerCase() ===
        loginId.trim().toLowerCase()
    );

    if (!user) {
      setError("Account not found. Please create an account first.");
      return;
    }

    onLogin(user);
  };

  return (
    <div className="auth-container">
      {mode === "register" ? (
        <div className="form-card auth-card">
          <h1>Create Account</h1>

          <p>Create your community library account.</p>

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

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Membership ID</label>

              <input
                type="text"
                value={membershipId}
                onChange={(event) =>
                  setMembershipId(event.target.value)
                }
                placeholder="Create a membership ID"
              />
            </div>

            <div className="form-buttons">
              <button
                type="submit"
                className="primary-button"
              >
                Create Account
              </button>
            </div>
          </form>

          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="link-button"
              onClick={() => {
                setMode("login");
                setError("");
                setMessage("");
              }}
            >
              Login
            </button>
          </p>
        </div>
      ) : (
        <div className="form-card auth-card">
          <h1>Library Login</h1>

          <p>Login to access the community library.</p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Membership ID</label>

              <input
                type="text"
                value={loginId}
                onChange={(event) =>
                  setLoginId(event.target.value)
                }
                placeholder="Enter your membership ID"
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

          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className="link-button"
              onClick={() => {
                setMode("register");
                setError("");
                setMessage("");
              }}
            >
              Create Account
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Auth;