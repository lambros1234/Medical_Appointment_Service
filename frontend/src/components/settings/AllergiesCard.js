import { useState } from "react";

export default function AllergiesCard() {
  const [allergies, setAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState("");

  const addAllergy = () => {
    if (!newAllergy) return;

    setAllergies([...allergies, newAllergy]);
    setNewAllergy("");
  };

  const removeAllergy = (index) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

      <h2 className="text-lg font-semibold mb-4">
        Allergies
      </h2>

      <div className="flex gap-2 mb-4">

        <input
          value={newAllergy}
          onChange={(e) => setNewAllergy(e.target.value)}
          placeholder="Add allergy"
          className="border rounded-lg p-2 flex-1"
        />

        <button
          onClick={addAllergy}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg"
        >
          Add
        </button>

      </div>

      <ul className="space-y-2">
        {allergies.map((allergy, index) => (
          <li
            key={index}
            className="flex justify-between items-center border p-2 rounded-lg"
          >
            {allergy}

            <button
              onClick={() => removeAllergy(index)}
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