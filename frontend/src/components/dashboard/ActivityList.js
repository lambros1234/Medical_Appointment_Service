export default function ActivityList({ items }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No recent activity</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}