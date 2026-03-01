import { useNavigate } from "react-router-dom";

export default function QuickActionCard({ title, description, icon, to }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className="bg-white rounded-2xl shadow-sm p-6 cursor-pointer hover:shadow-md hover:scale-[1.02] transition"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}