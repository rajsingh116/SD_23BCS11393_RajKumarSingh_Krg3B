import React, { useState } from "react";

function Booking() {
  const [formData, setFormData] = useState({
    vehicleType: "",
    serviceDate: "",
    serviceType: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // JWT token stored after login
    if (!token) {
      setMessage("⚠️ Please log in to book a service.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/customers/book-service",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Service booked successfully!");
        setFormData({
          vehicleType: "",
          serviceDate: "",
          serviceType: "",
          description: "",
        });
      } else {
        setMessage(`❌ ${data.message || data}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error! Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Book a Service</h1>
          <button
            onClick={handleBack}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Booking Form */}
      <main className="flex-grow flex items-center justify-center px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
            Service Booking Form
          </h2>

          {message && (
            <p className="text-center mb-4 text-red-600 font-medium">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Vehicle Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Vehicle Type
              </label>
              <input
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                placeholder="e.g., Sedan, SUV, Bike"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Service Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Service Date
              </label>
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Service Type
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Service --</option>
                <option value="oilChange">Oil Change</option>
                <option value="tireRotation">Tire Rotation</option>
                <option value="brakeInspection">Brake Inspection</option>
                <option value="generalMaintenance">General Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write any specific concerns or requirements..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Book Service
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center text-gray-600">
        © {new Date().getFullYear()} Vehicle Service Booking System
      </footer>
    </div>
  );
}

export default Booking;
