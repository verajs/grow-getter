import { useState } from "react";
import {
  RiCheckboxCircleLine,
  RiCheckboxBlankCircleLine,
  RiEdit2Fill,
} from "react-icons/ri";
import EditFields from "./EditFields";
const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Practice meditation for 10 minutes", isChecked: false },
    { id: 2, text: "Read a chapter of a mindfulness book", isChecked: false },
    { id: 3, text: "Write three things I'm grateful for", isChecked: false },
  ]);

  const [input, setInput] = useState("");
  const [currentTask, setCurrentTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleEditClick = (task) => {
    setEditText(task.text);
    setCurrentTask(task);
    setModalOpen(true);
  };
  const toggleCheckbox = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  const handleSaveEdit = () => {
    // Handle the save logic here
    console.log("Saved:", editText);
    setModalOpen(false);
  };
  const handleAddTask = () => {
    if (input) {
      setTasks([...tasks, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-transparent rounded-xl shadow-md mx-auto w-full p-4">
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between text-black p-3 rounded-full shadow mb-2 text-lg"
            style={{ minWidth: "90%", maxWidth: "100%" }}
          >
            <div className="flex">
              <button
                className="text-green-800 hover:text-green-800"
                onClick={() => toggleCheckbox(task.id)}
              >
                {task.isChecked ? (
                  <RiCheckboxCircleLine />
                ) : (
                  <RiCheckboxBlankCircleLine />
                )}
              </button>

              <span className="ml-2 text-sm">{task.text}</span>
            </div>
            <button
              className="text-green-800 hover:text-green-800"
              onClick={() => handleEditClick(task)}
            >
              <RiEdit2Fill />
            </button>
          </li>
        ))}
        {isModalOpen && (
          <EditFields
            text={currentTask.text}
            onSave={handleSaveEdit}
            id={currentTask.id}
          />
        )}
      </ul>
    </div>
  );
};

export default TodoList;
