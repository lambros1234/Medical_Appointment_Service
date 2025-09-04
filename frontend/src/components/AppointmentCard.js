import { useState, useEffect } from "react";

export default function AppointmentCard({ appointment, onCancel, onConfirm }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role")?.trim();
    setUserRole(role);
  }, []);

  const handleCancel = async () => {
    if (onCancel) onCancel(appointment.id);
  };

  const handleConfirm = async () => {
    if (onConfirm) onConfirm(appointment.id);
  };

  return (
    <li className="flex justify-between gap-x-6 py-5 px-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
      {/* Left: patient info */}
      <div className="flex min-w-0 gap-x-4">
        <img
          alt=""
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            appointment.patientName
          )}`}
          className="size-12 flex-none rounded-full bg-gray-200"
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold">{appointment.patientName}</p>
          <p className="mt-1 text-xs text-gray-500">Doctor: {appointment.doctorName}</p>
        </div>
      </div>

      {/* Right: date, status, actions */}
      <div className="flex flex-col items-end gap-2">
        <p className="text-sm text-gray-900">
          {appointment.date} at {appointment.time}
        </p>
        <div className="flex items-center gap-x-1.5">
          <div
            className={`flex-none rounded-full p-1 ${
              appointment.status === "CONFIRMED"
                ? "bg-emerald-500/20"
                : "bg-yellow-500/20"
            }`}
          >
            <div
              className={`size-1.5 rounded-full ${
                appointment.status === "CONFIRMED"
                  ? "bg-emerald-500"
                  : "bg-yellow-500"
              }`}
            />
          </div>
          <p className="text-xs text-gray-500">{appointment.status}</p>
        </div>

        {(
          userRole?.includes("PATIENT") || 
          (userRole?.includes("DOCTOR") && appointment.status === "CONFIRMED")
        ) && (
          <button
            onClick={handleCancel}
            className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
          >
            Cancel
          </button>
        )}

        {userRole?.includes("DOCTOR") && appointment.status !== "CONFIRMED" && (
          <button
            onClick={handleConfirm}
            className="rounded bg-green-500 px-3 py-1 text-xs text-white hover:bg-green-600"
          >
            Confirm
          </button>
        )}

      </div>
    </li>
  );
}
