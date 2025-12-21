import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Requests related to this HR
  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["hr-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?email=${user?.email}`);
      return res.data;
    },
  });

  const handleAction = async (id, status, requesterName) => {
    try {
      const res = await axiosSecure.patch(`/requests/${id}`, { status });
      if (res.data.success || res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Request ${status === "approved" ? "Approved" : "Rejected"}!`,
          text:
            status === "approved"
              ? `${requesterName} is now in your team (if not already).`
              : "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Action failed", "error");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md min-h-screen">
      <h2 className="text-2xl font-bold mb-6">All Asset Requests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-base-200">
            <tr>
              <th>Asset Info</th>
              <th>Requester</th>
              <th>Email</th>
              <th>Note</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td>
                  <div className="font-bold">{req.assetName}</div>
                  <div className="text-xs opacity-50">{req.assetType}</div>
                </td>
                <td>{req.requesterName}</td>
                <td>{req.requesterEmail}</td>
                <td className="max-w-xs truncate" title={req.note}>
                  {req.note}
                </td>
                <td>
                  <div
                    className={`badge ${
                      req.requestStatus === "pending"
                        ? "badge-warning"
                        : req.requestStatus === "approved"
                        ? "badge-success text-white"
                        : "badge-error text-white"
                    }`}
                  >
                    {req.requestStatus}
                  </div>
                </td>
                <td>
                  {req.requestStatus === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleAction(req._id, "approved", req.requesterName)
                        }
                        className="btn btn-xs btn-success text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleAction(req._id, "rejected", req.requesterName)
                        }
                        className="btn btn-xs btn-error text-white"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs italic">
                      Processed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <p className="text-center mt-10 text-gray-500">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default AllRequests;
