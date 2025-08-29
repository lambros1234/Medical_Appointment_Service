import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, approveUser, updateUser } from "../api/users";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/Loading";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      // Remove recursive doctor_profile.user to prevent duplication
      const cleanUsers = data.map(user => {
        if (user.doctor_profile && user.doctor_profile.user) {
          return {
            ...user,
            doctor_profile: {
              ...user.doctor_profile,
              user: undefined, // remove nested user
            },
          };
        }
        return user;
      });
      setUsers(cleanUsers);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await deleteUser(id);
    loadUsers();
  };

  const handleApprove = async (id) => {
    await approveUser(id);
    loadUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData(user);
  };

  const handleUpdate = async () => {
    await updateUser(editingUser, formData);
    setEditingUser(null);
    loadUsers();
  };

  if (loading) return <LoadingSpinner />;


  return (
    <MainLayout>
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>

        <table className="min-w-full border">
            <thead>
            <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Approved</th>
                <th className="border px-4 py-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) =>
                editingUser === user.id ? (
                <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">
                    <input
                        value={formData.username}
                        onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                        }
                    />
                    </td>
                    <td className="border px-4 py-2">
                    <input
                        value={formData.email}
                        onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    </td>
                    <td className="border px-4 py-2">{formData.role?.join(", ")}</td>
                    <td className="border px-4 py-2">{formData.enabled ? "Yes" : "No"}</td>
                    <td className="border px-4 py-2">
                    <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                        Cancel
                    </button>
                    </td>
                </tr>
                ) : (
                <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      {Array.isArray(user.role) ? user.role.join(", ") : user.role}
                    </td>
                    <td className="border px-4 py-2">{user.enabled ? "Yes" : "No"}</td>
                    <td className="border px-4 py-2 space-x-2">
                    <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Delete
                    </button>
                    {!user.enabled && (
                        <button
                        onClick={() => handleApprove(user.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                        Approve
                        </button>
                    )}
                    </td>
                </tr>
                )
            )}
            </tbody>
        </table>
        </div>
    </MainLayout>
  );
};

export default UserList;
