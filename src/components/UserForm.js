import React, { useEffect, useState } from "react";

function UserForm({ users, setUsers, editingUser, setEditingUser }) {
  const [formData, setFormData] = useState({
    name: "",
    membershipId: "",
    role: "Member"
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        membershipId: editingUser.membershipId,
        role: editingUser.role
      });
    } else {
      setFormData({
        name: "",
        membershipId: "",
        role: "Member"
      });
    }

    setError("");
  }, [editingUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.membershipId.trim()) {
      setError("Please complete all fields.");
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: formData.name.trim(),
                membershipId: formData.membershipId.trim(),
                role: formData.role
              }
            : user
        )
      );

      setEditingUser(null);
    } else {
      const newUser = {
        id: Date.now(),
        name: formData.name.trim(),
        membershipId: formData.membershipId.trim(),
        role: formData.role
      };

      setUsers([...users, newUser]);
    }

    setFormData({
      name: "",
      membershipId: "",
      role: "Member"
    });

    setError("");
  };

  const handleCancel = () => {
    setEditingUser(null);

    setFormData({
      name: "",
      membershipId: "",
      role: "Member"
    });

    setError("");
  };

  return (
    <div className="form-card">
      <h2>{editingUser ? "Update User" : "Add User"}</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter user name"
          />
        </div>

        <div className="form-group">
          <label>Membership ID</label>
          <input
            type="text"
            name="membershipId"
            value={formData.membershipId}
            onChange={handleChange}
            placeholder="e.g. LIB003"
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Member">Member</option>
            <option value="Librarian">Librarian</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="primary-button">
            {editingUser ? "Update User" : "Add User"}
          </button>

          {editingUser && (
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

export default UserForm;