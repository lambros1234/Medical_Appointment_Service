import { useState } from "react";

export default function SpecialtiesCard() {
  const [specialties, setSpecialties] = useState([]);
  const [newSpecialty, setNewSpecialty] = useState("");

  const addSpecialty = () => {
    if (!newSpecialty) return;

    setSpecialties([...specialties, newSpecialty]);
    setNewSpecialty("");
  };

  const removeSpecialty = (index) => {
    setSpecialties(specialties.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

      <h2 className="text-lg font-semibold mb-4">
        Specialties
      </h2>

      <div className="flex gap-2 mb-4">

        <input
          value={newSpecialty}
          onChange={(e) => setNewSpecialty(e.target.value)}
          placeholder="Add specialty"
          className="border rounded-lg p-2 flex-1"
        />

        <button
          onClick={addSpecialty}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg"
        >
          Add
        </button>

      </div>

      <ul className="space-y-2">
        {specialties.map((spec, index) => (
          <li
            key={index}
            className="flex justify-between items-center border p-2 rounded-lg"
          >
            {spec}

            <button
              onClick={() => removeSpecialty(index)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}