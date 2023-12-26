const Tab = ({ title, onClick, isActive }) => {
  return (
    <div
      className={`flex justify-center ${
        isActive ? "text-white bg-[#4C2B21]" : "text-black bg-[#FDFBF7]"
      } font-medium p-3, text-base cursor-pointer rounded-md w-full items-center py-3 ${
        !isActive && "hover:bg-[#F1EEE3]"
      }`}
      onClick={() => onClick(title)}
    >
      {title}
    </div>
  );
};

export default Tab;
