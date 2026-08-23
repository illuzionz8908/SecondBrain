




export function SideBaritem({ text, icon, isActive = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex py-2 cursor-pointer
      hover:bg-gray-200 rounded max-w-48 pl-6 transition-all duration-300
      ${isActive ? "bg-purple-100 text-purple-600" : ""}`}
    >
      <div className="pr-3">{icon}</div>
      <div>{text}</div>
    </div>
  );
}