import React from "react";
import EditClientModal from "../Components/EditClientModal";

// Sample bookings array
const bookings = [
  {
    id: "BKG-001",
    clientName: "Lindsay Walton",
    contact: "lindsay.walton@example.com",
    preferredStylist: "Tom Cook",
    service: "Hair Coloring",
    bookingDate: "2025-10-30",
    bookingTime: "10:00 AM",
    duration: "1h 30m",
    specialRequests: "Use organic products",
    status: "Attended",
    paymentStatus: "Paid",
  },
  {
    id: "BKG-002",
    clientName: "Courtney Henry",
    contact: "0723456789",
    preferredStylist: "Whitney Francis",
    service: "Manicure",
    bookingDate: "2025-10-31",
    bookingTime: "2:00 PM",
    duration: "1h",
    specialRequests: "French tips",
    status: "Non-Attended",
    paymentStatus: "Deposit Paid",
  },
  {
    id: "BKG-003",
    clientName: "Tom Cook",
    contact: "tom.cook@example.com",
    preferredStylist: "Lindsay Walton",
    service: "Haircut",
    bookingDate: "2025-11-01",
    bookingTime: "11:00 AM",
    duration: "45m",
    specialRequests: "",
    status: "Pending",
    paymentStatus: "Unpaid",
  },
  // Add more bookings as needed
];

export default function BookingsList() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-black">Salon Bookings</h1>
          <p className="mt-2 text-sm text-black-300">
            List of all bookings with client details, status, and payment.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-400">
            Add Booking
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-white/10 rounded-lg">
              <table className="min-w-full divide-y divide-white/20 table-auto">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Booking ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Client Name</th>
                    {/* <th className="px-4 py-3 text-left text-sm font-semibold text-white">Contact</th> */}
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Preferred Stylist</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Service</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Booking Date & Time</th>
                    {/* <th className="px-4 py-3 text-left text-sm font-semibold text-white">Duration</th> */}
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Special Requests</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Payment Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10 bg-[#3d2b4a]">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-800">
                      <td className="px-4 py-4 text-sm text-white">{booking.id}</td>
                      <td className="px-4 py-4 text-sm text-white">{booking.clientName}</td>
                      {/* <td className="px-4 py-4 text-sm text-gray-300">{booking.contact}</td> */}
                      <td className="px-4 py-4 text-sm text-gray-300">{booking.preferredStylist}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{booking.service}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">
                        {booking.bookingDate} - {booking.bookingTime}
                      </td>
                      {/* <td className="px-4 py-4 text-sm text-gray-300">{booking.duration}</td> */}
                      <td className="px-4 py-4 text-sm text-gray-300">{booking.specialRequests || "-"}</td>
                      <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-400">
                        <span
                          className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-white ring-1 ring-green-500/50 ring-inset ${
                            booking.status === "Attended"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300">{booking.paymentStatus}</td>
                      <td className="px-4 py-4 text-sm flex space-x-2">
                        
                        <button className="text-indigo-400 hover:text-indigo-300">Edit</button>
                        <button className="text-yellow-400 hover:text-yellow-300">Cancel</button>
                        <button className="text-red-400 hover:text-red-300">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}