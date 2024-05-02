import { useState, useEffect } from "react";
import axios from "axios";
import { IoTrashOutline } from "react-icons/io5";

const EditFields = ({ userId, todoId, onSave, task, onExit }) => {
  const [editText, setEditText] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [averageTimeSpent, setAverageTimeSpent] = useState("N/A"); // State to store average time spent

  useEffect(() => {
    // Function to fetch the average time spent
    const fetchAverageTime = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/${userId}/todos/${todoId}/completion-time`
        );
        if (response.data === null) {
          setAverageTimeSpent("N/A"); // Set to N/A if there is no data
          return;
        }

        setAverageTimeSpent(response.data); // Set the fetched time
      } catch (error) {
        console.error("Failed to fetch completion time", error);
        setAverageTimeSpent("N/A"); // Set to N/A if there is an error
      }
    };

    fetchAverageTime();
  }, [userId, todoId]); // Depend on userId and todoId to refetch if they change

  // Function to create initial daysActive state from task.days_active
  const createInitialDaysActive = (activeDays) => {
    const days = {
      Sun: false,
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
    };
    activeDays.forEach((day) => {
      if (days.hasOwnProperty(day)) {
        days[day] = true;
      }
    });
    return days;
  };

  const [daysActive, setDaysActive] = useState(
    createInitialDaysActive(task.days_active)
  );

  const toggleDay = (day) => {
    setDaysActive((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const hasChanges = () => {
    const initialDaysActive = createInitialDaysActive(task.days_active);
    const daysChanged = Object.keys(daysActive).some(
      (day) => daysActive[day] !== initialDaysActive[day]
    );
    return (
      editText !== task.title || description !== task.description || daysChanged
    );
  };

  const handleSaveEdit = async () => {
    if (!hasChanges()) {
      onExit();
      return;
    }

    const activeDays = Object.entries(daysActive)
      .filter(([_, isActive]) => isActive)
      .map(([day, _]) => day);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/users/${userId}/todos/${todoId}`,
        {
          title: editText,
          description,
          days_active: activeDays,
        }
      );
      onSave(response.data); // Assuming onSave will handle the response data
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  const handleDeleteTodo = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/users/${userId}/todos/${todoId}`
      );
      onExit();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center z-[999] items-center">
      <div className="bg-[#f4e9da] text-center p-6 rounded-lg shadow-lg transition-transform transform border-black-300 scale-95 animate-scale-in">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="appearance-none border-0 font-medium text-1xl text-center bg-transparent text-black p-2 rounded-md w-full focus:outline-none"
        />

        <div className="mt-4">
          <div className="text-left text-black text-sm my-4">
            Average Hours This Takes:{" "}
            {averageTimeSpent !== null ? `${averageTimeSpent}` : "Loading..."}
          </div>
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

        <div className="mt-4 flex flex-col items-center space-y-2">
          <button
            onClick={handleSaveEdit}
            className="bg-green-700 hover:bg-green-800 focus:bg-green-800 rounded-3xl text-white font-bold py-2 px-8"
          >
            ✓
          </button>
          <button
            onClick={handleDeleteTodo}
            className="text-red-600 rounded-3xl font-bold py-2 px-4"
          >
            <IoTrashOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFields;
