import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../components/SuccessAlert"
import FailAlert from "../components/FailAlert";
import { fetchSpecialties, createSpecialty } from "../api/specialties"; // create an API function to fetch specialties
import { useEffect } from "react";


export default function RegisterPage() {
  const [role, setRole] = useState(null); // null | "PATIENT" | "DOCTOR"
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    specialty: "", // doctor only
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [newSpecialty, setNewSpecialty] = useState(""); // for "Other"

  useEffect(() => {
  const loadSpecialties = async () => {
    try {
      const data = await fetchSpecialties(); // returns an array like ["CARDIOLOGY", "DERMATOLOGY"]
      setSpecialties(data);
    } catch (err) {
      console.error("Failed to load specialties", err);
    }
  };

  loadSpecialties();
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let specialtyToSend = formData.specialty;

      if (formData.specialty === "OTHER" && newSpecialty.trim() !== "") {
        const name = newSpecialty.trim().toUpperCase();

        // Try to create the specialty in backend
        await createSpecialty(name);
        specialtyToSend = name;
      }
      const payload = { ...formData, role: [role], specialty: specialtyToSend, }; // Add role
      console.log(payload);
      const response = await registerUser(payload);
      setSuccessMessage("User registered successfully!");
    } catch (err) {
      setErrorMessage("Failed to register");
    }
  };

  // Step 1: Choose role
  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6">Register as</h2>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setRole("PATIENT")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Patient
            </button>
            <button
              onClick={() => setRole("DOCTOR")}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Doctor
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Show form based on role
  return (
 
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {successMessage && (
      <SuccessAlert
        message={successMessage}
        onClose={() => {
          setSuccessMessage(""); // hide the alert
          navigate("/");         // navigate after closing
        }}
      />
        )}
        {errorMessage && (
          <FailAlert message={errorMessage} onClose={() => setErrorMessage("")} />
        )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {role === "PATIENT" ? "Patient Registration" : "Doctor Registration"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mt-4"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mt-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mt-4"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mt-4"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mt-4"
          required
        />

        {/* Doctor-only field */}
        {role === "DOCTOR" && (
          <div className="mt-4">
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            >
              <option value="">Select Specialty</option>
              {specialties.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
              <option value="OTHER">Other (Add new)</option>
            </select>


              {formData.specialty === "OTHER" && (
                <input
                  type="text"
                  placeholder="Enter new specialty"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className="border rounded-lg p-2 w-full mt-2"
                  required
                />
              )}
            </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg p-2 mt-6 hover:bg-blue-700 transition"
        >
          Register
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
}
