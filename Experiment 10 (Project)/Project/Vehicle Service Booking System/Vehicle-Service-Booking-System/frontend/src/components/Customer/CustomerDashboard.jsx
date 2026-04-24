import { Link } from "react-router-dom";

function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Customer Dashboard</h1>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
          >
            Logout
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/booking"
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Book Service
            </h2>
            <p className="text-gray-600">
              Schedule a new service appointment for your vehicle.
            </p>
          </Link>

          <Link
            to="/view-bookings"
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              View Bookings
            </h2>
            <p className="text-gray-600">
              Check your booking history and current status.
            </p>
          </Link>

          <Link
            to="/profile"
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-purple-600 mb-2">
              Profile
            </h2>
            <p className="text-gray-600">
              View and update your personal information.
            </p>
          </Link>

          <Link
            to="/login"
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-red-600 mb-2">Logout</h2>
            <p className="text-gray-600">
              Securely log out from your account and end your session.
            </p>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-200 py-4 text-center text-gray-600">
        © {new Date().getFullYear()} Vehicle Service Booking System
      </footer>
    </div>
  );
}

export default CustomerDashboard;
