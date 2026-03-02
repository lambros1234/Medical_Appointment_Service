import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, approveUser, updateUser } from "../../api/users";
import MainLayout from "../../layouts/MainLayout";
import LoadingSpinner from "../../components/Loading";
import SuccessAlert from "../../components/SuccessAlert"


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");


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

    setAlertTitle("User Deleted");
    setAlertMessage("The user has been deleted successfully.");
    setAlertOpen(true);
  };


  const handleApprove = async (id) => {
    await approveUser(id);
    loadUsers();

    setAlertTitle("User Approved");
    setAlertMessage("The user has been approved successfully.");
    setAlertOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData(user);
  };

  const handleUpdate = async () => {
    await updateUser(editingUser, formData);
    setEditingUser(null);
    loadUsers();

    setAlertTitle("User Updated");
    setAlertMessage("User details have been updated successfully.");
    setAlertOpen(true);
  };


  if (loading) return <LoadingSpinner />;


  return (
  <MainLayout>
    <SuccessAlert
      open={alertOpen}
      title={alertTitle}
      message={alertMessage}
      onClose={() => setAlertOpen(false)}
    />

    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            User Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage users, approvals and permissions
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((user) =>
                editingUser === user.id ? (
                  <tr key={user.id} className="bg-slate-50">
                    <td className="px-6 py-4">
                      <input
                        className="border rounded-lg px-3 py-2 w-full"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                      />
                      <input
                        className="border rounded-lg px-3 py-2 w-full mt-2"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </td>

                    <td className="px-6 py-4">
                      {formData.role?.join(", ")}
                    </td>

                    <td className="px-6 py-4">
                      {formData.enabled ? "Approved" : "Pending"}
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={handleUpdate}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 transition"
                  >
                    {/* User column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {user.username}
                          </p>
                          <p className="text-slate-500 text-xs">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 text-slate-600">
                      {Array.isArray(user.role)
                        ? user.role.join(", ")
                        : user.role}
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4">
                      {user.enabled ? (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                          Approved
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs"
                      >
                        Delete
                      </button>

                      {!user.enabled && (
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs"
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
      </div>
    </div>
  </MainLayout>
);
};

export default UserList;
