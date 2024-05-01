import {
  RiCheckboxCircleLine,
  RiCheckboxBlankCircleLine,
  RiEdit2Fill,
} from "react-icons/ri";
import EditFields from "./EditFields";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; // Assuming you have AuthContext set up
import axios from "axios"; // Import Axios
import { FaPlus } from "react-icons/fa";
import AddTask from "./AddTask";

const TodoList = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [currentDayTodos, setCurrentDayTodos] = useState([]);
  const [otherDayTodos, setOtherDayTodos] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [editText, setEditText] = useState("");
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/users/${user.id}/todos`
      );
      setTodos(
        response.data.map((todo) => ({ ...todo, isChecked: todo.completed }))
      );
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/${user.id}/todos`
        );
        setTodos(
          response.data.map((todo) => ({ ...todo, isChecked: todo.completed }))
        );
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    if (user) {
      fetchTodos();
    } else {
      console.error("User is not logged in");
    }
  }, [user]);

  useEffect(() => {
    const currentDay = new Date().toString().split(" ")[0]; // Get current day (e.g., "Mon", "Tue", etc.)
    const currentDayFiltered = todos.filter((todo) =>
      todo.days_active.includes(currentDay)
    );
    const otherDayFiltered = todos.filter(
      (todo) => !todo.days_active.includes(currentDay)
    );

    setCurrentDayTodos(currentDayFiltered);
    setOtherDayTodos(otherDayFiltered);
  }, [todos]);

  const handleEditClick = (task) => {
    setEditText(task.text);
    setCurrentTask(task);
    setModalOpen(true);
  };

  const setaddTask = () => {
    setAddTask(true);
  };

  const toggleCheckbox = async (todoId) => {
    // Optimistically update the UI
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/users/${user.id}/todos/${todoId}/complete`
      );
      console.log("Todo updated:", response.data);
      // Optionally, refresh the todo list here if the backend response differs from the optimistic update
    } catch (error) {
      console.error("Error updating todo:", error);
      // Revert the optimistic UI update if the backend call fails
      setTodos(
        todos.map((todo) =>
          todo.id === todoId ? { ...todo, isChecked: !todo.isChecked } : todo
        )
      );
    }
  };

  const handleSaveEdit = async () => {
    console.log("Saved:", editText);
    setModalOpen(false);
    if (addTask === true) {
      setAddTask(false);
    }
    if (user) {
      await fetchTodos(); // Refetch todos after save
    }
  };

  const handleExit = async () => {
    setModalOpen(false);
    if (addTask === true) {
      setAddTask(false);
    }
    if (user) {
      await fetchTodos(); // Refetch todos on exit without saving
    }
  };

  return (
    <div className="bg-transparent rounded-xl shadow-md mx-auto w-full p-4">
      <button
        onClick={setaddTask}
        className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center text-2xl cursor-pointer text-green-800 bg-white rounded-full shadow-lg transition-colors"
      >
        <FaPlus />
      </button>

      <ul>
        <h1 className="text-black text-2xl p-4">Opportunities of today</h1>
        {currentDayTodos.map((todo) => (
          <li
            key={todo.created_date}
            className="flex justify-between text-black p-3 rounded-full shadow mb-2 text-lg"
            style={{ minWidth: "90%", maxWidth: "100%" }}
          >
            <div className="flex">
              <button
                className="text-green-800 hover:text-green-800"
                onClick={() => toggleCheckbox(todo.id)}
              >
                {todo.isChecked ? (
                  <RiCheckboxCircleLine />
                ) : (
                  <RiCheckboxBlankCircleLine />
                )}
              </button>

              <span className="ml-2 text-base">{todo.title}</span>
            </div>
            <button
              className="text-green-800 hover:text-green-800"
              onClick={() => handleEditClick(todo)}
            >
              <RiEdit2Fill />
            </button>
          </li>
        ))}
        <ul>
          <h1 className="text-black text-2xl p-4">Future Opportunities</h1>
          {otherDayTodos.map((todo) => (
            <li
              key={todo.created_date}
              className="flex justify-between text-black p-3 rounded-full shadow mb-2 text-lg"
              style={{ minWidth: "90%", maxWidth: "100%" }}
            >
              <div className="flex">
                <button
                  className="text-green-800 hover:text-green-800"
                  onClick={() => toggleCheckbox(todo.id)}
                >
                  {todo.isChecked ? (
                    <RiCheckboxCircleLine />
                  ) : (
                    <RiCheckboxBlankCircleLine />
                  )}
                </button>

                <span className="ml-2 text-base">{todo.title}</span>
              </div>
              <button
                className="text-green-800 hover:text-green-800"
                onClick={() => handleEditClick(todo)}
              >
                <RiEdit2Fill />
              </button>
            </li>
          ))}
        </ul>
        {isModalOpen && currentTask && (
          <EditFields
            text={currentTask.title}
            onSave={handleSaveEdit}
            onExit={handleExit}
            todoId={currentTask.id}
            userId={user.id}
            task={currentTask}
          />
        )}
        {addTask && (
          <AddTask
            userId={user.id}
            onExit={handleExit}
            onSave={handleSaveEdit}
          />
        )}
      </ul>
    </div>
  );
};

export default TodoList;
