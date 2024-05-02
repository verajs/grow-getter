import TodoList from "./TodoList";

const Overlay = ({ onClose, show }) => {
  const handleButtonClick = (e) => {
    e.stopPropagation(); 
    onClose(); 
  };

  return (
    <div
      className={`fixed inset-0 bg-[#f4e9da] flex flex-col z-[400] p-4 transition-opacity duration-1000 ease-in-out ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col justify-center space-y-4 pt-24 mx-8 lg:mx-24 overflow-auto max-h-[calc(100vh-8rem)]">
        <TodoList />
      </div>
      <div
        className="mt-auto p-3 bg-green-800 text-[#f4e9da] font-bold px-14 rounded-3xl shadow-xl cursor-pointer text-center"
        style={{ alignSelf: "center" }}
        onClick={handleButtonClick}
      >
        OK
      </div>
    </div>
  );
};

export default Overlay;
