import {
  LayoutDashboard,
  ShoppingCart,
  NotepadText,
  BedSingle,
  Coins,
  Package,
  UserCog,
  BookMarked,
  History,
} from "lucide-react";
import { MdTableRestaurant } from "react-icons/md";
import coffee from "../../assets/images/coffee.jpg";
import { useAuth } from "../../context/authContext.jsx";
import { NavLink} from "react-router-dom";

function AdminDashboard() {
  const { role } = useAuth();
  const isAdmin = role === "admin";

  const adminMenuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "menu", label: "Menu", icon: NotepadText },
    { id: "tables", label: "Tables", icon: MdTableRestaurant },
    { id: "rooms", label: "Rooms", icon: BedSingle },
    { id: "reservations", label: "Reservations", icon: BookMarked },
    { id: "finance", label: "Finance", icon: Coins },
    { id: "staff", label: "Staff", icon: UserCog },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "history", label: "History", icon: History },
  ];

  const userMenuItems = [
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "menu", label: "Menu", icon: NotepadText },
    { id: "tables", label: "Tables", icon: MdTableRestaurant },
    { id: "rooms", label: "Rooms", icon: BedSingle },
    { id: "reservations", label: "Reservations", icon: BookMarked },
    { id: "inventory", label: "Inventory", icon: Package },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div className="w-45 md:w-64 bg-white h-screen border-r border-gray-200 flex flex-col sticky tip-0">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
          <img
            src={coffee}
            alt="cafe logo"
            className="object-cover w-full h-full"
          />
        </div>

        <div>
          <h2 className="text-[#4B2E2A] text-[17px] md:text-xl font-semibold">
            Manager
          </h2>
          <p className="text-[#6A4A45] text-xs md:text-sm p-0.5 font-medium">
            Welcome back
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-2 flex-1 p-4 ">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={`/dashboard/${item.id.toLowerCase().trim()}`} // important
              end={item.id === ""} // for dashboard root
              className={({ isActive }) =>
                `w-full flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#F5E6D3] font-medium text-[16px]  text-[#4B2E2A]"
                    : "text-[#6A4A45] font-medium text-[16px]  hover:bg-[#fff4e9]"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span >{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
    
  );
}

export default AdminDashboard;
