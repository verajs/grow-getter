import { useState } from "react";
import axios from "axios";
import { RiCloseLine } from "react-icons/ri"; // Import close icon

const AddTask = ({ userId, onSave, onExit }) => {
  const [newTitle, setNewTitle] = useState("");
  const [description, setDescription] = useState("");

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

  const handleAddTask = async () => {
    const activeDays = Object.entries(daysActive)
      .filter(([_, isActive]) => isActive)
      .map(([day, _]) => day);

    try {
      const response = await axios.post(
        `https://sellermation.com/users/${userId}/todos`,
        {
          title: newTitle,
          description,
          days_active: activeDays,
        }
      );
      onSave(response.data);
      onExit();
    } catch (error) {
      console.error("Error adding new todo:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-[999]">
      <div className="relative bg-[#f4e9da] text-center p-6 rounded-lg shadow-lg transition-transform transform border-black-300 scale-95 animate-scale-in">
        <button
          onClick={onExit}
          className="absolute top-0 right-0 m-4 text-xl text-black hover:text-green-600"
        >
          <RiCloseLine />
        </button>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="appearance-none border-0 font-medium text-1xl text-center bg-transparent text-black p-2 rounded-md w-full focus:outline-none"
          placeholder="Enter task title..."
        />

        <div className="mt-4">
          <div className="text-left text-black text-sm pt-4">
            On Which Days?
          </div>
          <div className="flex justify-center space-x-2 mt-2 pb-8">
            {Object.keys(daysActive).map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`h-10 w-10 rounded-full text-white ${
                  daysActive[day] ? "bg-emerald-800" : "bg-gray-300"
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
            className="mt-1 text-black block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Add important details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleAddTask}
          className="mt-4 bg-green-700 hover:bg-green-800 focus:bg-green-800 rounded-3xl text-white font-bold py-2 px-4"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
