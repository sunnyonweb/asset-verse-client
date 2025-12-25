import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const UpdateAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue } = useForm();

  // 1. Fetch Existing Data
  const { data: asset, isLoading } = useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets/${id}`);
      return res.data;
    },
  });

  // 2. Prefill Form
  useEffect(() => {
    if (asset) {
      setValue("productName", asset.productName);
      setValue("productType", asset.productType);
      setValue("productQuantity", asset.productQuantity);
    }
  }, [asset, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/assets/${id}`, data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Asset Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/home");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Update failed" });
    }
  };

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8">Update Asset</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Product Name</span>
          </label>
          <input
            type="text"
            {...register("productName", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex gap-6">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text font-bold">Type</span>
            </label>
            <select
              {...register("productType")}
              className="select select-bordered w-full"
            >
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>

          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text font-bold">Quantity</span>
            </label>
            <input
              type="number"
              {...register("productQuantity", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button className="btn btn-primary w-full text-white mt-4">
          Update Asset
        </button>
      </form>
    </div>
  );
};

export default UpdateAsset;
