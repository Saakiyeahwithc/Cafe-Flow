import { LogOut } from "lucide-react";
import { useAuth } from "../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex-1">
      <div className="bg-white border-b border-gray-200 h-22 px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-bold text-2xl">Welcome</h2>
          <p className="text-gray-500 text-sm">Have a great day!</p>
        </div>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="flex items-center font-medium gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
}

export default Header;
