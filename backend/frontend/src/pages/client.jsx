import React from "react";
import EditClientModal from "../Components/EditClientModal";
import DeleteClientModal from "../Components/DeleteClientModal";
import AddClientModal from "../Components/AddClientModal";
import useClientsdata from "../Reusable-Components/useClientsdata";

// const clients = [
//   {
//     id: 1,
//     firstname: "White",
//     lastname : 'Hall',
//     email: "hall.walton@example.com",
//     phonenumber: "0719172805",
//     preferredstylist: "Kimani Grant",
//     bookingDate: "2026-03-30",
//     notes: "Hair coloring",
//     status: "Attended",
    
//   },
  
//   {
//     id: 2,
//     firstname: "Whale",
//     lastname : 'Mason',
//     email: "whale.mason@example.com",
//     phonenumber: "0722000000",
//     preferredstylist: "Whitney Myers",
//     bookingDate: "2026-03-31",
//     notes: "Manicure",
//     status: "Non-Attended",
    
//   },
 
// ];




export default function ClientsList() {
  const{clients,isLoadingClients,clientsError} = useClientsdata()

if(isLoadingClients) return <p>...isLoading</p>
if(clientsError) return <p>There is an error loading clients data</p>
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-white">Salon Clients</h1>
          <p className="mt-2 text-sm text-black-300">
            List of all clients with their booking details and status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <AddClientModal
        
          />
          {/* <button className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-400">
            Add Client
          </button> */}
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-white/10 rounded-lg">
              <table className="min-w-full divide-y divide-white/20 table-auto">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                      First Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                      Last Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                      Stylist
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                      Booking Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                      Requests
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-[#3d2b4a]">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-800">
                      <td className="px-4 py-4 text-sm text-white break-all">{client._id}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">
                        {/* <img
                          src={client.image}
                          alt={client.fullname}
                          className="h-10 w-10 rounded-full mr-3"
                        /> */}
                        {client.firstname}
                      </td>
                       <td className="px-4 py-4 text-sm text-gray-300">
                        {/* <img
                          src={client.image}
                          alt={client.fullname}
                          className="h-10 w-10 rounded-full mr-3"
                        /> */}
                        {client.lastname}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 break-all">{client.email}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{client.phonenumber}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{client.preferredstylist}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{client.bookingDate}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{client.notes}</td>
                      <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-400">
                        <span
                          className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-white ring-1 ring-green-500/50 ring-inset ${
                            client.status === "Attended"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className=" py-4 text-sm flex space-x-2 items-center justify-center">
                        <EditClientModal client={client}/>
                        {/* <button className="text-indigo-400 hover:text-indigo-300">Edit</button> */}
                        {/* <button className="text-red-400 hover:text-red-300">Delete</button> */}
                        <DeleteClientModal userId ={client._id}/>
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