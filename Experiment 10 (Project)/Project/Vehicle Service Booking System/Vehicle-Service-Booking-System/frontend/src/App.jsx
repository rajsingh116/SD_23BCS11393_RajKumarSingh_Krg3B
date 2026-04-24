import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

import Booking from "./components/Customer/Booking";
import ViewBookings from "./components/Customer/ViewBooking";
import Profile from "./components/Customer/Profile";

import MechanicDashboard from "./components/Mechanic/MechanicDashboard";
import ViewAssignedJob from "./components/Mechanic/ViewAssignedJob";
import UpdateJobStatus from "./components/Mechanic/UpdateJobStatus";
import MechanicProfile from "./components/Mechanic/MechanicProfile";

import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageMechanic from "./components/Admin/ManageMechanic";
import ManageCustomer from "./components/Admin/ManageCustomer";
import ManageJob from "./components/Admin/ManageJob";
import Settings from "./components/Admin/Settings";

import ProtectedRoutes from "./components/routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRoutes />}>

          {/* Common */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Customer */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/view-bookings" element={<ViewBookings />} />
          <Route path="/profile" element={<Profile />} />

          {/* Mechanic */}
          <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
          <Route path="/view-assigned-jobs" element={<ViewAssignedJob />} />
          <Route path="/update-job-status" element={<UpdateJobStatus />} />
          <Route path="/mechanic-profile" element={<MechanicProfile />} />

          {/* Admin */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/mechanics" element={<ManageMechanic />} />
          <Route path="/admin/customers" element={<ManageCustomer />} />
          <Route path="/admin/jobs" element={<ManageJob />} />
          <Route path="/admin/settings" element={<Settings />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;