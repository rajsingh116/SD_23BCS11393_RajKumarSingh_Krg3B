import { useState, useEffect } from "react";
import { Search, Users } from "lucide-react";

function ManageCustomer() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch all users (customers) from backend
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT token after login

      if (!token) {
        setError("Please log in as admin to view customers.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/admin/all-users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch customers: ${response.status}`);
      }

      const data = await response.json();
      // Optional: filter only CUSTOMER roles if backend returns all users
      const onlyCustomers = data.filter((user) => user.role === "CUSTOMER");

      setCustomers(onlyCustomers);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 🔍 Filter customers by name or email
  const filteredCustomers = customers.filter(
    (c) =>
      (c.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-indigo-700 text-xl font-semibold">
        Loading customers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4 sm:mb-0 flex items-center gap-2">
            <Users className="w-7 h-7 text-indigo-600" />
            Manage Customers
          </h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-10 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-indigo-200 rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="hover:bg-indigo-50 transition-all border-b text-gray-700"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">
                    {customer.fullName || "N/A"}
                  </td>
                  <td className="py-3 px-4">{customer.email}</td>
                  <td className="py-3 px-4">{customer.role}</td>
                  <td className="py-3 px-4">
                    {new Date(customer.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No customers found matching your search.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-indigo-700 text-center">
        © {new Date().getFullYear()} Vehicle Service System | Admin Panel
      </footer>
    </div>
  );
}

export default ManageCustomer;
