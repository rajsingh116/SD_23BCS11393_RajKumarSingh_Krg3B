import { useState, useEffect } from "react";
import { ClipboardList, Filter, CheckCircle } from "lucide-react";

function ManageJob() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch all services (jobs) from backend
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in as admin to view jobs.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/admin/all-services",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update job: assign mechanic by email
  const updateJobStatus = async (jobId) => {
    const mechanicEmail = prompt("Enter mechanic email to assign this job:");

    if (!mechanicEmail) {
      alert("Mechanic email is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/admin/Manage-job-status/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(mechanicEmail),
        }
      );

      const message = await response.text();
      if (response.ok) {
        alert("✅ " + message);
        fetchJobs(); // refresh the table
      } else {
        alert("❌ " + message);
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Server error while updating job status.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🔹 Filter jobs by status
  const filteredJobs =
    statusFilter === "All"
      ? jobs
      : jobs.filter(
          (job) =>
            job.status &&
            job.status.toLowerCase() === statusFilter.toLowerCase()
        );

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-indigo-700 text-xl font-semibold">
        Loading jobs...
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
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <ClipboardList className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-700">Manage Jobs</h1>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-indigo-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </header>

        {/* Job Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-indigo-200 rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Job ID</th>
                <th className="py-3 px-4 text-left">Customer ID</th>
                <th className="py-3 px-4 text-left">Vehicle Type</th>
                <th className="py-3 px-4 text-left">Service Type</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Service Date</th>
                <th className="py-3 px-4 text-left">Assigned Mechanic</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-indigo-50 transition-all border-b"
                >
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    #{job.id}
                  </td>
                  <td className="py-3 px-4">{job.customerId || "N/A"}</td>
                  <td className="py-3 px-4">{job.vehicleType || "N/A"}</td>
                  <td className="py-3 px-4">{job.serviceType || "N/A"}</td>
                  <td className="py-3 px-4">{job.description || "N/A"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {job.serviceDate
                      ? new Date(job.serviceDate).toLocaleDateString("en-GB")
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {job.assignedMechanicEmail || "Not Assigned"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => updateJobStatus(job.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center gap-1 mx-auto"
                    >
                      <CheckCircle className="w-4 h-4" /> Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No jobs found for the selected status.
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageJob;
