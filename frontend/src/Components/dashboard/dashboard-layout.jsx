import AdminDashboard from "./admin-dashboard.jsx";
import Header from "../layouts/header.jsx";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminDashboard />
      <div className="flex-1 overflow-auto bg-gray-50">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
