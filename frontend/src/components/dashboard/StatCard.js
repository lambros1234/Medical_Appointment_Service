export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div
          className={`h-12 w-12 flex items-center justify-center rounded-xl ${color}`}
        >
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}