import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch My Requests
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["my-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-requests/${user.email}`);
      return res.data;
    },
  });

  // Filter Logic
  const filteredRequests = requests.filter((req) => {
    const matchesSearch = req.assetName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filterStatus
      ? req.requestStatus === filterStatus
      : true;
    return matchesSearch && matchesFilter;
  });

  // Handle Return Action
  const handleReturn = (id) => {
    Swal.fire({
      title: "Return Asset?",
      text: "HR will be notified that you returned this item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Return it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/requests/${id}`, {
          status: "returned",
        });

        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire("Returned!", "Asset status updated.", "success");
        }
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Assets & Requests</h2>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by asset name..."
          className="input input-bordered w-full md:w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="returned">Returned</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req._id}>
                <td className="font-bold">{req.assetName}</td>
                <td>{req.assetType}</td>
                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                <td>
                  {req.approvalDate
                    ? new Date(req.approvalDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <div
                    className={`badge ${
                      req.requestStatus === "approved"
                        ? "badge-success text-white"
                        : req.requestStatus === "pending"
                        ? "badge-warning"
                        : "badge-ghost"
                    }`}
                  >
                    {req.requestStatus}
                  </div>
                </td>
                <td>
                  {req.requestStatus === "approved" &&
                    req.assetType === "Returnable" && (
                      <button
                        onClick={() => handleReturn(req._id)}
                        className="btn btn-xs btn-outline btn-warning"
                      >
                        Return
                      </button>
                    )}
                  {req.requestStatus === "pending" && (
                    <button className="btn btn-xs btn-disabled">
                      Wait for Approval
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
