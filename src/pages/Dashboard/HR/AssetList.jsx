import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // States for Filter, Search, Pagination
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch Assets
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["assets", user?.email, search, filterType, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?email=${user?.email}&search=${search}&type=${filterType}&page=${page}&limit=${limit}`
      );
      return res.data; // Returns
    },
  });

  // Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/assets/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Your asset has been deleted.", "success");
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Asset List</h2>

      {/* --- SEARCH & FILTER SECTION --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search assets..."
            className="input input-bordered w-full pl-10"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <FaSearch className="absolute top-4 left-3 text-gray-400" />
        </div>

        {/* Filter */}
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Filter:</span>
          <select
            className="select select-bordered select-sm"
            onChange={(e) => {
              setFilterType(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {data?.assets?.map((asset, index) => (
              <tr key={asset._id} className="hover:bg-base-100">
                <td>{(page - 1) * limit + index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={asset.productImage} alt={asset.productName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{asset.productName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge ${
                      asset.productType === "Returnable"
                        ? "badge-primary badge-outline"
                        : "badge-secondary badge-outline"
                    }`}
                  >
                    {asset.productType}
                  </span>
                </td>
                <td className="font-bold text-center">
                  {asset.productQuantity}
                </td>
                <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                <td>
                  <Link to={`/dashboard/update-asset/${asset._id}`}>
                    <button className="btn btn-ghost btn-xs text-info text-lg">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="btn btn-ghost btn-xs text-error text-lg ml-2"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION SECTION --- */}
      {data?.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            <button
              className="join-item btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              «
            </button>
            {[...Array(data.totalPages).keys()].map((num) => (
              <button
                key={num}
                className={`join-item btn ${
                  page === num + 1 ? "btn-active" : ""
                }`}
                onClick={() => setPage(num + 1)}
              >
                {num + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              disabled={page === data.totalPages}
              onClick={() => setPage(page + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;
