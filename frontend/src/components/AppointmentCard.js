import { useMemo } from "react";

export default function AppointmentCard({ appointment, onCancel, onConfirm }) {
  const roles = useMemo(() => {
    try {
      const stored = localStorage.getItem("roles");
      if (stored) return JSON.parse(stored);
    } catch {}
    const single = localStorage.getItem("role");
    return single ? [single] : [];
  }, []);

  const isPatient = roles.includes("ROLE_PATIENT");
  const isDoctor = roles.includes("ROLE_DOCTOR");

  const canCancel =
    (isPatient && appointment.status !== "CANCELLED") ||
    (isDoctor && appointment.status === "CONFIRMED"); // keep your logic if you want

  const canConfirm = isDoctor && appointment.status !== "CONFIRMED" && appointment.status !== "CANCELLED";

  const statusStyles =
    appointment.status === "CONFIRMED"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : appointment.status === "CANCELLED"
      ? "bg-red-50 text-red-700 ring-red-200"
      : "bg-yellow-50 text-yellow-700 ring-yellow-200";

  const title = isPatient ? `Dr. ${appointment.doctorName}` : appointment.patientName;
  const subtitle = isPatient ? `Patient: ${appointment.patientName}` : `Doctor: ${appointment.doctorName}`;

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <img
            alt=""
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=E8F0FE&color=1D4ED8`}
            className="h-11 w-11 rounded-full bg-gray-100 flex-none"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
            <p className="mt-0.5 text-xs text-gray-500 truncate">{subtitle}</p>
          </div>
        </div>

        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusStyles}`}>
          {appointment.status}
        </span>
      </div>

      {/* Middle */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-900 font-medium">
          {appointment.date} • {appointment.time}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        {canCancel && (
          <button
            onClick={() => onCancel?.(appointment.id)}
            className="flex-1 rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 transition"
          >
            Cancel
          </button>
        )}

        {canConfirm && (
          <button
            onClick={() => onConfirm?.(appointment.id)}
            className="flex-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition"
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
}