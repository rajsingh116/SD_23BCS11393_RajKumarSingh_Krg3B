import { Users, Wrench, ClipboardList, Settings, LogOut } from "lucide-react";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 flex flex-col items-center p-8">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-indigo-600 text-lg">
          Manage users, jobs, and system settings from one place.
        </p>
      </header>

      {/* Dashboard Cards */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Manage Mechanics */}
        <a
          href="/admin/mechanics"
          className="bg-white/90 border border-indigo-100 rounded-2xl shadow-xl p-8 hover:scale-105 hover:shadow-indigo-200 transition-all flex flex-col items-center text-center"
        >
          <Wrench className="w-12 h-12 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Manage Mechanics
          </h2>
          <p className="text-gray-600">
            View, edit, or remove mechanics and assign service jobs.
          </p>
        </a>

        {/* Manage Customers */}
        <a
          href="/admin/customers"
          className="bg-white/90 border border-indigo-100 rounded-2xl shadow-xl p-8 hover:scale-105 hover:shadow-indigo-200 transition-all flex flex-col items-center text-center"
        >
          <Users className="w-12 h-12 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Manage Customers
          </h2>
          <p className="text-gray-600">
            Access customer records and booking details.
          </p>
        </a>

        {/* Manage Jobs */}
        <a
          href="/admin/jobs"
          className="bg-white/90 border border-indigo-100 rounded-2xl shadow-xl p-8 hover:scale-105 hover:shadow-indigo-200 transition-all flex flex-col items-center text-center"
        >
          <ClipboardList className="w-12 h-12 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Manage Jobs
          </h2>
          <p className="text-gray-600">
            Track job assignments, progress, and service reports.
          </p>
        </a>

        {/* Settings */}
        <a
          href="/admin/settings"
          className="bg-white/90 border border-indigo-100 rounded-2xl shadow-xl p-8 hover:scale-105 hover:shadow-indigo-200 transition-all flex flex-col items-center text-center"
        >
          <Settings className="w-12 h-12 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Profile</h2>
          <p className="text-gray-600">
            Update system configurations and admin preferences.
          </p>
        </a>

        {/* Logout */}
        <a
          href="/"
          className="bg-red-500 text-white rounded-2xl shadow-lg p-8 hover:bg-red-600 transition-all flex flex-col items-center text-center col-span-1 sm:col-span-2 lg:col-span-1"
        >
          <LogOut className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold">Logout</h2>
          <p className="text-sm text-white/90">Sign out from admin panel</p>
        </a>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-sm text-indigo-700 text-center">
        © {new Date().getFullYear()} Vehicle Service System | Admin Panel
      </footer>
    </div>
  );
}

export default AdminDashboard;
