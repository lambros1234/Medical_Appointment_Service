import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarCard({
  appointments,
  selectedDate,
  setSelectedDate,
}) {
  // Check if a given date has an appointment
  const hasAppointment = (date) => {
    const formatted = date.toISOString().split("T")[0]; 
    return appointments.some((a) => a.date === formatted);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Calendar</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={({ date, view }) =>
          view === "month" && hasAppointment(date) ? ( // Show a dot if there's an appointment on this date
            <div className="flex justify-center mt-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            </div>
          ) : null
        }
        className="border-none w-full"
      />

      {selectedDate && (
        <button
          onClick={() => setSelectedDate(null)}
          className="mt-4 w-full text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg transition"
        >
          Clear filter
        </button>
      )}
    </div>
  );
}