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
  const [completedTodos, setCompletedTodos] = useState(0); // Initialize with user's completed todos
  const [averageCompletionTime, setAverageCompletionTime] = useState(null);
  const [otherDayTodos, setOtherDayTodos] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (user) {
      setCompletedTodos(user.completed_todos);
    }
  }, [user]);
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `http://34.125.43.215:8000/users/${user.id}/todos`
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
          `http://34.125.43.215:8000/users/${user.id}/todos`
        );
        const fetchedTodos = response.data.map((todo) => ({
          ...todo,
          isChecked: todo.completed,
        }));
        setTodos(fetchedTodos);
        if (fetchedTodos.length === 0) {
          setAddTask(true); // Automatically open AddTask if no todos
        }
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
        `http://34.125.43.215:8000/users/${user.id}/todos/${todoId}/complete`
      );
      console.log("Todo updated:", response.data);
    } catch (error) {
      console.error("Error updating todo:", error);
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
      await fetchTodos(); 
    }
  };

  const handleExit = async () => {
    setModalOpen(false);
    if (addTask === true) {
      setAddTask(false);
    }
    if (user) {
      await fetchTodos(); 
    }
  };

  useEffect(() => {
    const fetchAverageCompletionTime = async () => {
      try {
        const response = await axios.get(
          `http://34.125.43.215:8000/users/${user.id}/average-completion-time`
        );
        setAverageCompletionTime(response.data); // Assumes the endpoint returns a number
      } catch (error) {
        console.error("Error fetching average completion time:", error);
        setAverageCompletionTime(null); // Handle errors or non-existent data
      }
    };
    if (user) {
      setCompletedTodos(user.completed_todos);
      fetchAverageCompletionTime();
    }
  }, [user]);

  return (
    <div className="bg-white rounded-xl shadow-md mx-auto w-full p-4">
      <button
        onClick={setaddTask}
        className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center text-2xl cursor-pointer text-green-800 bg-white rounded-full shadow-lg hover:bg-green-100"
      >
        <FaPlus />
      </button>

      <div className="space-y-4">
        <h1 className="text-black text-3xl">Welcome!</h1>
        <h1 className="text-black text-2xl">Opportunities of today</h1>
        {currentDayTodos.length > 0 ? (
          currentDayTodos.map((todo) => (
            <li
              key={todo.created_date}
              className="flex justify-between items-center text-black p-3 rounded-lg shadow mb-2 text-lg"
            >
              <div className="flex items-center">
                <button
                  className="text-green-800 hover:text-green-600"
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
                className="text-green-800 hover:text-green-600"
                onClick={() => handleEditClick(todo)}
              >
                <RiEdit2Fill />
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 italic">
            No tasks for today. Click on the &quot;+&quot; to add new tasks.
          </p>
        )}
        <h1 className="text-black text-2xl">Future Opportunities</h1>
        {otherDayTodos.length > 0 ? (
          otherDayTodos.map((todo) => (
            <li
              key={todo.created_date}
              className="flex justify-between items-center text-black p-3 rounded-lg shadow mb-2 text-lg"
            >
              <div className="flex items-center">
                <button
                  className="text-green-800 hover:text-green-600"
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
                className="text-green-800 hover:text-green-600"
                onClick={() => handleEditClick(todo)}
              >
                <RiEdit2Fill />
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 italic">No upcoming tasks. Plan ahead!</p>
        )}
      </div>
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
        <AddTask userId={user.id} onExit={handleExit} onSave={handleSaveEdit} />
      )}
      <h1 className="text-black text-base pt-10">
        The average time it takes you to complete a task from the moment you
        create it is:{" "}
        {averageCompletionTime ? `${averageCompletionTime} hours` : "N/A"}
      </h1>
      <h1 className="text-black text-base">
        Todos completed so far: {completedTodos}
      </h1>
      <p className="text-gray-700 italic text-xs">
        For non N/A analytics, at least two completions are necessary, and a
        task is considered completed and included in your score after a full day
        has elapsed without it being deselected.
      </p>
    </div>
  );
};

export default TodoList;
