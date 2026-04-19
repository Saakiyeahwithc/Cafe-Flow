import {
  LayoutDashboard,
  ShoppingCart,
  Menu,
  Home,
  DollarSign,
  Package,
  UserCog,
} from "lucide-react"
import coffee from './assets/coffee.jpg'

function Testing() {
  const activeTab = "dashboard"; // temporary default (remove later or replace with state)

  {/*const onTabChange = (id) => {
    console.log("Tab clicked:", id);
  };*/}

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "menu", label: "Menu", icon: Menu },
    { id: "tables", label: "Tables", icon: Home },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "staff", label: "Staff", icon: UserCog },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <div className="inline-block w-16 h-16 mb-3 rounded-full overflow-hidden">
          <img src={coffee} alt="cafe logo" className="object-cover w-full h-full" />
        </div>

        <div>
          <h2 className="text-red-500">Cafe Manager</h2>
          <p className="text-gray-400 text-xs">Welcome back</p>
        </div>
      </div>

      <div className="space-y-2 flex-1 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-red-50 text-red-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <p className="inline">{item.label}</p>
            </button>
          );
        })}

      </div>

    </div>
  );
}

export default Testing;