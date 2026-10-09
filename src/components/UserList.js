import React from "react";

function UserList({ users, onEdit, onDelete }) {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="list-card">
      <h2>Library Users</h2>

      {users.length === 0 ? (
        <p>No users have been added yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Membership ID</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.membershipId}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => onEdit(user)}
                    >
                      Update
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
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

export default UserList;