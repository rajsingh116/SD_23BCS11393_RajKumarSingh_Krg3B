import { Wrench, ClipboardList, User } from "lucide-react";
import { Link } from "react-router-dom";

function MechanicDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-700 text-white px-6">
      {/* Header Section */}
      <header className="text-center mb-10 animate-fade-in">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Mechanic Dashboard
        </h1>
        <p className="mt-3 text-lg text-indigo-100">
          Manage your daily tasks, job updates, and profile in one place.
        </p>
      </header>

      {/* Navigation Cards */}
      <nav className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl animate-fade-up">
        {/* View Assigned Jobs */}
        <Link
          to="/view-assigned-jobs"
          className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-white/20 hover:scale-105 transition-all shadow-xl"
        >
          <Wrench className="w-14 h-14 text-yellow-300 mb-4 group-hover:rotate-12 transition-transform" />
          <h2 className="text-2xl font-semibold mb-2">View Assigned Jobs</h2>
          <p className="text-indigo-100 text-sm text-center">
            Check all service jobs assigned to you.
          </p>
        </Link>

        {/* Update Job Status */}
        <Link
          to="/update-job-status"
          className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-white/20 hover:scale-105 transition-all shadow-xl"
        >
          <ClipboardList className="w-14 h-14 text-green-300 mb-4 group-hover:rotate-12 transition-transform" />
          <h2 className="text-2xl font-semibold mb-2">Update Job Status</h2>
          <p className="text-indigo-100 text-sm text-center">
            Update progress and mark completed repairs.
          </p>
        </Link>

        {/* View Profile */}
        <Link
          to="/mechanic-profile"
          className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-white/20 hover:scale-105 transition-all shadow-xl"
        >
          <User className="w-14 h-14 text-blue-300 mb-4 group-hover:rotate-12 transition-transform" />
          <h2 className="text-2xl font-semibold mb-2">View Profile</h2>
          <p className="text-indigo-100 text-sm text-center">
            View and manage your personal information.
          </p>
        </Link>
      </nav>

      {/* Footer */}
      <footer className="mt-16 text-sm text-indigo-200">
        © {new Date().getFullYear()} Vehicle Service System | Designed for
        Mechanics
      </footer>
    </div>
  );
}

export default MechanicDashboard;
