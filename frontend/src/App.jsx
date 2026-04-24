import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/selectRole.jsx";
import LoginScreen from "./pages/auth/loginScreen.jsx";
import Header from "./Components/layouts/header.jsx";
import Signin from "./pages/auth/signin.jsx";
import Staff from "./Components/dashboard/staff.jsx";
import AdminDashboard from "./Components/dashboard/sidebar.jsx";
import DashboardLayout from "./Components/dashboard/layout.jsx";
import Overview from "./Components/dashboard/overview.jsx";
import OrdersView from "./Components/dashboard/orders.jsx";
import Tables from "./Components/dashboard/tables.jsx";
import Rooms from "./Components/dashboard/room.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signin" element={<Signin />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="orders" element={<OrdersView />} />
          <Route path="tables" element={<Tables />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="staff" element={<Staff />} />
        </Route>
          {/* <Route path="menu" element={<Menu />} />
          <Route path="tables" element={<Tables />} />
          <Route path="rooms" element={<Rooms />} /> */}
        
      </Routes>
      {/* <Tables/> */}
    </>
  );
}

export default App;
