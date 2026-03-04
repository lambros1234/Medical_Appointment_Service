import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/settings";

export default function ProfileInfoCard() {

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      console.log("Profile data:", data);
      setProfile(data);
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(profile);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

      <h2 className="text-lg font-semibold mb-4">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          name="firstName"
          value={profile.firstName || ""}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <input
          name="lastName"
          value={profile.lastName || ""}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <input
          name="email"
          value={profile.email || ""}
          readOnly
          className="border rounded-lg p-2 bg-gray-100"
        />

        <input
          name="phone"
          value={profile.phone || ""}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <input
          name="address"
          value={profile.address || ""}
          onChange={handleChange}
          className="border rounded-lg p-2 md:col-span-2"
        />

      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Save Changes
      </button>

    </div>
  );
}