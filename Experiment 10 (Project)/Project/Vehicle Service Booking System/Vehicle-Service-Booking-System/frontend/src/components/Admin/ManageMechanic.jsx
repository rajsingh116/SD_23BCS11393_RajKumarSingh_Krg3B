import { useEffect, useState } from "react";
import { Wrench, User } from "lucide-react";

function ManageMechanic() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch mechanics from backend
  const fetchMechanics = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT stored after login

      if (!token) {
        setError("Please log in as admin to view mechanics.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/admin/all-mechanics",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      setMechanics(data);
    } catch (err) {
      console.error("Error fetching mechanics:", err);
      setError("Failed to load mechanics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-indigo-700 text-xl font-semibold">
        Loading mechanics...
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
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2 flex items-center justify-center gap-2">
          <Wrench className="w-8 h-8 text-indigo-600" />
          Manage Mechanics
        </h1>
        <p className="text-indigo-600 text-lg">
          View all registered mechanics in the system.
        </p>
      </div>

      {/* Mechanics Table */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-indigo-100 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 flex items-center gap-2">
          <User className="w-6 h-6 text-indigo-500" /> Mechanics List
        </h2>

        {mechanics.length === 0 ? (
          <p className="text-center text-gray-600">No mechanics found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-indigo-700 text-left">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Full Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Role</th>
                <th className="p-3 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {mechanics.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-indigo-50 transition border-b text-gray-700"
                >
                  <td className="p-3">{m.id}</td>
                  <td className="p-3 font-medium">{m.fullName}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3">{m.role}</td>
                  <td className="p-3">
                    {new Date(m.createdAt).toLocaleString("en-GB", {
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
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-indigo-700 text-center">
        © {new Date().getFullYear()} Vehicle Service System | Admin Panel
      </footer>
    </div>
  );
}

export default ManageMechanic;
