export default function AppointmentCard({ appointment }) {

  // NOT FINISHED


    const handleDelete = async () => {

    }

    const handleEdit = async () => {

    }




  return (
    <li className="flex justify-between gap-x-6 py-5 px-4">
      {/* Left side: patient info */}
      <div className="flex min-w-0 gap-x-4">
        <img
          alt=""
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            appointment.patientName
          )}`}
          className="size-12 flex-none rounded-full bg-gray-50"
        />
        <div className="min-w-0 flex-auto">
          <p className="mt-1 truncate text-xs text-gray-500">
            Doctor: {appointment.doctorName}
          </p>
        </div>
      </div>

      {/* Right side: date, status, and actions */}
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm text-gray-900">
          {appointment.date} at {appointment.time}
        </p>
        <div className="mt-1 flex items-center gap-x-1.5">
          <div
            className={`flex-none rounded-full p-1 ${
              appointment.status === "confirmed"
                ? "bg-emerald-500/20"
                : "bg-yellow-500/20"
            }`}
          >
            <div
              className={`size-1.5 rounded-full ${
                appointment.status === "confirmed"
                  ? "bg-emerald-500"
                  : "bg-yellow-500"
              }`}
            />
          </div>
          <p className="text-xs text-gray-500">{appointment.status}</p>
        </div>

        {/* Action buttons */}
        <div className="mt-3 flex gap-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(handleEdit)}
              className="rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(handleDelete)}
              className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
