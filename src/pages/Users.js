
import React, { useState } from "react";

import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

function Users({ users, setUsers }) {
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = (id) => {
    setUsers(
      users.filter((user) => user.id !== id)
    );

    if (editingUser?.id === id) {
      setEditingUser(null);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      <p>
        Add, update and remove library users.
      </p>

      <UserForm
        users={users}
        setUsers={setUsers}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />

      <UserList
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Users;

