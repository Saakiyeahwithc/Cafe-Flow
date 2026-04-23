import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/selectRole.jsx";
import LoginScreen from "./pages/auth/loginScreen.jsx";
import Header from "./components/layouts/header.jsx";
import Signin from "./pages/auth/signin.jsx";
import Staff from "./components/staff.jsx";
import AdminDashboard from "./Components/dashboard/admin-dashboard.jsx";
import DashboardLayout from "./Components/dashboard/dashboard-layout.jsx";
import Overview from "./Components/dashboard/dashboard-overview.jsx";
import { OrdersView } from "./Components/dashboard/orders.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signin" element={<Signin />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="orders" element={<OrdersView />} />
          {/* <Route path="menu" element={<Menu />} />
          <Route path="tables" element={<Tables />} />
          <Route path="rooms" element={<Rooms />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
