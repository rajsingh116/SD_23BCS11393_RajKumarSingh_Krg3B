import CustomerDashboard from "./Customer/CustomerDashboard";
import MechanicDashboard from "./Mechanic/MechanicDashboard";
import AdminDashboard from "./Admin/AdminDashboard";

function Dashboard() {
  const role = localStorage.getItem("role");

  if (role === "CUSTOMER") {
    return <CustomerDashboard />;
  } else if (role === "MECHANIC") {
    return <MechanicDashboard />;
  } else if (role === "ADMIN") {
    return <AdminDashboard />;
  } else {
    return <h2>No role found. Please login again.</h2>;
  }
}

export default Dashboard;
