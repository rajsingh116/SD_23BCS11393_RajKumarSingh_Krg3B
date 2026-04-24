import React, { useEffect, useState } from "react";

function ViewBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Function to fetch bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token"); // token from localStorage (if you’re using JWT)
      const response = await fetch(
        "http://localhost:8080/api/customers/booking-status",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      // console.log("Fetched Bookings:", data); // ✅ Debugging log
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Load bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold text-gray-600">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Your Bookings
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Vehicle Type</th>
                <th className="py-3 px-4 text-left">Service Type</th>
                <th className="py-3 px-4 text-left">Service Date</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={booking.id || index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 capitalize">
                      {booking.vehicleType || "N/A"}
                    </td>
                    <td className="py-3 px-4 capitalize">
                      {booking.serviceType || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {booking.serviceDate
                        ? new Date(booking.serviceDate).toLocaleDateString(
                            "en-GB"
                          )
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {booking.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={fetchBookings}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Refresh Bookings
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewBooking;
