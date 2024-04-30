import { useState } from "react";

const EditFields = ({ text, onSave, id }) => {
  const [editText, setEditText] = useState(text); // Initialize with passed text
  const [daysActive, setDaysActive] = useState({
    Sun: false,
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
  });
  const toggleDay = (day) => {
    setDaysActive((prev) => ({ ...prev, [day]: !prev[day] }));
  };
  const handleSaveEdit = () => {
    onSave(id, editText); // Pass the ID and new text back to the parent component
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
      <div className="bg-[#f4e9da] text-center p-6 rounded-lg shadow-lg transition-transform transform border-black-300 scale-95 animate-scale-in">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="appearance-none border-0 font-medium text-1xl text-center bg-transparent text-black p-2 rounded-md w-full focus:outline-none"
        />

        <div className="mt-4">
          <div className="text-black text-start text-sm">
            Longest streak: 24 times
          </div>
          <div className="text-left text-black text-sm pt-4 ">
            On Which Days?
          </div>
          <div className="flex justify-center space-x-2 mt-2 pb-8">
            {Object.entries(daysActive).map(([day, isActive]) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`h-10 w-10 rounded-full text-white ${
                  isActive ? "bg-emerald-800" : "bg-gray-300"
                } flex items-center justify-center text-xs`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 bg-gray-200 p-4 rounded-lg shadow-inner">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Describe your goal
          </label>
          <textarea
            id="description"
            rows="4"
            className="mt-1 block text-black w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Add important details..."
          ></textarea>
        </div>

        <button
          onClick={handleSaveEdit}
          className="mt-4 bg-green-700 hover:bg-green-800 focus:bg-green-800 rounded-3xl text-white font-bold py-2 px-4"
        >
          ✓
        </button>
      </div>
    </div>
  );
};

export default EditFields;
