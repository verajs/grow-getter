import TodoList from "./TodoList";

const Overlay = ({ onClose, show }) => {
  // This function stops propagation of click events from the button
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Stop the click event from bubbling up to the overlay
    onClose(); // Call the onClose function passed as a prop
  };

  return (
    <div
      className={`fixed inset-0 bg-[#f4e9da] flex flex-col   p-4 transition-opacity duration-1000 ease-in-out ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col justify-center space-y-4 pt-24 mx-8 lg:mx-24">
        <TodoList />
      </div>
      <div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 p-3 bg-green-800 text-[#f4e9da] font-bold px-14 rounded-3xl shadow-xl cursor-pointer text-center"
        onClick={handleButtonClick}
      >
        OK
      </div>
    </div>
  );
};

export default Overlay;
