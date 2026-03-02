import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarCard({
  appointments,
  selectedDate,
  setSelectedDate,
}) {

  const hasAppointment = (date) => {
    const formatted = date.toISOString().split("T")[0];
    return appointments.some(a => a.date === formatted);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">
        Calendar
      </h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date, view }) =>
          view === "month" && hasAppointment(date)
            ? "bg-blue-100 rounded-lg"
            : null
        }
        className="border-none w-full"
      />

      {selectedDate && (
        <button
          onClick={() => setSelectedDate(null)}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          Clear filter
        </button>
      )}
    </div>
  );
}