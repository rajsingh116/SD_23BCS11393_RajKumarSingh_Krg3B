import { useEffect, useState } from "react";
import { User, Mail, MapPin, Wrench, Star } from "lucide-react";

function MechanicProfile() {
  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found — please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:8080/api/mechanics/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch mechanic profile");
        }

        const data = await res.json();
        setMechanic(data);
      } catch (error) {
        console.error("Error fetching mechanic profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <p className="text-indigo-600 text-lg font-semibold">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!mechanic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <p className="text-red-600 text-lg font-semibold">
          Unable to load profile. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2 flex items-center justify-center gap-2">
          <User className="w-8 h-8 text-indigo-600" />
          Mechanic Profile
        </h1>
        <p className="text-indigo-600 text-lg">
          View and manage your personal details
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-3xl w-full border border-indigo-100 hover:shadow-indigo-200 transition-all">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">
            {mechanic.fullName
              ? mechanic.fullName.charAt(0).toUpperCase()
              : "M"}
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {mechanic.fullName}
            </h2>
            <p className="text-indigo-600 font-medium">
              ID: {mechanic.id || "—"}
            </p>

            <div className="flex items-center justify-center sm:justify-start mt-2 text-yellow-500">
              <Star className="w-5 h-5 fill-yellow-400" />
              <span className="ml-1 font-semibold text-gray-700">
                4.5 / 5.0
              </span>
            </div>

            <p className="text-gray-600 mt-4">
              <span className="font-semibold text-gray-800">Role:</span>{" "}
              {mechanic.role}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Joined:</span>{" "}
              {new Date(mechanic.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-500" />
            <span>{mechanic.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-indigo-500" />
            <span>Location not set</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-indigo-600" /> Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium text-sm shadow-sm">
              General Vehicle Maintenance
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-sm text-indigo-600 text-center">
        © {new Date().getFullYear()} Vehicle Service System | Mechanic Portal
      </div>
    </div>
  );
}

export default MechanicProfile;
