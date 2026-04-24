import { useState, useEffect } from "react";
import { Wrench, ClipboardCheck, CheckCircle2, Loader2 } from "lucide-react";

function UpdateJobStatus() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 🔹 Fetch assigned jobs when component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("No token found — please log in again.");
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

        if (!res.ok) throw new Error("Failed to fetch assigned jobs");

        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
        setMessage("Error fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 🔹 Handle job status update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJobId || !status) {
      setMessage("⚠️ Please select a job and status before submitting.");
      return;
    }

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/api/mechanics/update-job-status/${selectedJobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to update status");
      }

      setMessage("✅ Job status updated successfully!");
      setStatus("");
      setSelectedJobId("");

      // Refresh jobs list
      const updatedJobs = await fetch(
        "http://localhost:8080/api/mechanics/assigned-jobs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newData = await updatedJobs.json();
      setJobs(newData);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("❌ Failed to update job status.");
    } finally {
      setUpdating(false);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700 flex items-center justify-center gap-2">
          <ClipboardCheck className="w-8 h-8 text-indigo-600" />
          Update Job Status
        </h1>
        <p className="text-indigo-600 text-lg mt-2">
          Select a job and update its progress below.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-indigo-100 hover:shadow-indigo-200 transition-all">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Job
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
              <Wrench className="text-indigo-500 mr-2" />
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700"
              >
                <option value="">-- Choose a Job --</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {`${job.vehicleType.toUpperCase()} - ${job.serviceType} (${
                      job.status
                    })`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Job Status
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
              <Loader2 className="text-indigo-500 mr-2" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700"
              >
                <option value="">-- Select Status --</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={updating}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition ${
              updating ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {updating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Updating...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" /> Update Status
              </>
            )}
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <div className="mt-6 text-center text-indigo-700 font-medium bg-indigo-100 border border-indigo-300 p-3 rounded-lg animate-fade-in">
            {message}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-sm text-indigo-600 text-center">
        © {new Date().getFullYear()} Vehicle Service System | Mechanic Portal
      </div>
    </div>
  );
}

export default UpdateJobStatus;
