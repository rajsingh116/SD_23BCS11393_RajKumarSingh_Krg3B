import { useEffect, useState } from "react";
import { Wrench, Calendar, MapPin, Clock, CheckCircle } from "lucide-react";

function ViewAssignedJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found — please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          "http://localhost:8080/api/mechanics/assigned-jobs",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch assigned jobs");
        }

        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <p className="text-indigo-600 text-lg font-semibold">
          Loading assigned jobs...
        </p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <p className="text-indigo-600 text-lg font-semibold">
          No assigned jobs found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-3">
          Assigned Jobs
        </h1>
        <p className="text-indigo-600 text-lg">
          Track your current and upcoming repair tasks.
        </p>
      </div>

      {/* Job Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-all border border-indigo-100"
          >
            <div className="flex items-center mb-4">
              <Wrench className="text-indigo-500 w-8 h-8 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {job.vehicleType}
              </h2>
            </div>

            <p className="text-gray-600 mb-2">
              <strong>Service:</strong>{" "}
              {job.serviceType.replace(/([A-Z])/g, " $1")}
            </p>

            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> {job.description}
            </p>

            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
              Service Bay (auto-assigned)
            </div>

            <div className="flex items-center text-gray-500 text-sm mb-2">
              <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
              {job.serviceDate}
            </div>

            <div className="flex items-center text-gray-500 text-sm mb-4">
              <Clock className="w-4 h-4 mr-2 text-indigo-400" />
              10:00 AM (approx)
            </div>

            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                job.status
              )}`}
            >
              {job.status === "Completed" && (
                <CheckCircle className="w-4 h-4 text-green-600" />
              )}
              {job.status}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-sm text-indigo-600">
        © {new Date().getFullYear()} Vehicle Service System | Mechanic View
      </div>
    </div>
  );
}

export default ViewAssignedJob;
