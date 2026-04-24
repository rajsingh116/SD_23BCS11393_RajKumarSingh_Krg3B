import { useEffect, useState } from "react";
import { User, Mail, Shield, Clock } from "lucide-react";

function Settings() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch admin profile
  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in as an Admin.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8080/api/admin/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to load admin profile");

      const data = await response.json();
      setAdmin(data);
    } catch (err) {
      console.error("Error fetching admin profile:", err);
      setError("Failed to load admin profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-indigo-700 text-lg font-semibold">
        Loading admin profile...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-lg font-medium">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center flex items-center justify-center gap-3">
          <User className="w-7 h-7 text-indigo-600" />
          Admin Profile
        </h1>

        <div className="space-y-6">
          <div className="border border-indigo-100 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={admin?.fullName || "N/A"}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={admin?.email || "N/A"}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Role
                </label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700">
                  <Shield className="text-indigo-600 w-5 h-5" />
                  <span>{admin?.role || "N/A"}</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Account Created At
                </label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700">
                  <Clock className="text-indigo-600 w-5 h-5" />
                  <span>
                    {admin?.createdAt
                      ? new Date(admin.createdAt).toLocaleString("en-IN")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
