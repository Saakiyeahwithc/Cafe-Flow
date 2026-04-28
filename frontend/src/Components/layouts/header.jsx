import { useAuth } from "../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut, Sun, CloudSun, SunMoon, Moon } from "lucide-react";
import { useEffect, useState } from "react";

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(new Date().getHours());
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  let greeting = "";
  let message = "";
  let Icon;

  if (hour < 12) {
    Icon=Sun;
    greeting = "Good Morning";
    message = "Have a great day ahead!";
  } 
  else if (hour < 17) {
    Icon=CloudSun;
    greeting = "Good Afternoon";
    message = "Stay steady and maintain your flow.";
  } 
  else if (hour < 21) {
    Icon=SunMoon;
    greeting = "Good Evening";
    message = "Evening ahead—stay composed and sharp.";
  } 
  else {
    Icon=Moon;
    greeting = "Good Night";
    message = "Wishing you a smooth shift!";
  }

  return (
    <div className="flex-1">
      <div className="bg-white border-b border-gray-200 h-full px-8 py-6 flex 
      items-center justify-between transition-normal">
        <div className=" w-50 md:w-80">
          <div className="flex gap-2.5 mb-1 items-center">
            <h2 className="font-bold text-xl md:text-2xl">{greeting}</h2>
            <Icon className="w-5.5 h-5.5 md:w-7 md:h-7 text-orange-600"/>
          </div>
          <p className="text-gray-500 font-medium text-xs md:text-sm">{message}</p>
        </div>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="flex items-center font-medium gap-2 px-3.5 py-2 text-red-600
          hover:bg-red-50 rounded-lg text-[15px] md:text-[18px] transition-colors">
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
}

export default Header;