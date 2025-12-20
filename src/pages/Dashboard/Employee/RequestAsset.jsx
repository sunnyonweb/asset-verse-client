import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null); // For Modal

  // 1. Fetch All Available Assets
  // (Note: In real app, we might filter assets that have quantity > 0)
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets-public", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?search=${search}&limit=100`); // Fetching more for grid
      return res.data.assets.filter((asset) => asset.productQuantity > 0); // Only show available
    },
  });

  // 2. Handle Request Submit
  const handleRequest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const note = form.note.value;

    const requestData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      requesterName: user.displayName,
      requesterEmail: user.email,
      hrEmail: selectedAsset.hrEmail, // Very Important for HR Dashboard
      companyName: selectedAsset.companyName,
      note: note,
      requestDate: new Date(),
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/requests", requestData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Sent!",
          text: "HR will review your request shortly.",
          showConfirmButton: false,
          timer: 1500,
        });
        // Close modal
        document.getElementById("request_modal").close();
        form.reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Request an Asset</h2>

      {/* Search Bar */}
      <div className="mb-8 w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search for laptop, chair..."
          className="input input-bordered w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all"
          >
            <figure className="px-5 pt-5 h-48">
              <img
                src={asset.productImage}
                alt={asset.productName}
                className="rounded-xl object-contain h-full w-full"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{asset.productName}</h2>
              <p className="text-gray-500 text-sm">Type: {asset.productType}</p>
              <p
                className={`font-bold ${
                  asset.productQuantity < 3 ? "text-red-500" : "text-green-600"
                }`}
              >
                Available: {asset.productQuantity}
              </p>
              <div className="card-actions mt-2">
                <button
                  className="btn btn-primary btn-sm text-white"
                  onClick={() => {
                    setSelectedAsset(asset);
                    document.getElementById("request_modal").showModal();
                  }}
                >
                  Request This Asset
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL (DaisyUI) --- */}
      <dialog id="request_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Requesting: {selectedAsset?.productName}
          </h3>
          <p className="py-4 text-sm text-gray-500">
            Provide a note for the HR Manager explaining why you need this.
          </p>

          <form onSubmit={handleRequest}>
            <textarea
              name="note"
              className="textarea textarea-bordered w-full"
              placeholder="Example: My current mouse is broken..."
              required
            ></textarea>

            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("request_modal").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary text-white">
                Send Request
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAsset;
