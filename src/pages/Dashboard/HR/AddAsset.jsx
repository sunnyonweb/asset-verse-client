import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { imageUpload } from "../../../utils/imageUpload";

const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Upload Image
      const imageFile = data.productImage[0];
      const imageURL = await imageUpload(imageFile);

      // 2. Prepare Data
      const assetData = {
        productName: data.productName,
        productImage: imageURL,
        productType: data.productType, // Returnable / Non-returnable
        productQuantity: parseInt(data.productQuantity),
        companyName: user?.displayName, // Assuming HR name is company owner for now, or fetch from DB user info
        // Better approach: We will handle companyName in backend from HR email or user context if saved
        // For now, let's send HR Email, backend will handle query
        hrEmail: user?.email,
      };

      // 3. Post to Backend
      const res = await axiosSecure.post("/assets", assetData);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          icon: "success",
          title: "Asset Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not add asset.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8">Add New Asset</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Product Name</span>
          </label>
          <input
            type="text"
            {...register("productName", { required: true })}
            placeholder="e.g. Macbook Pro M2"
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          {/* Product Type */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Product Type</span>
            </label>
            <select
              {...register("productType", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Product Quantity</span>
            </label>
            <input
              type="number"
              {...register("productQuantity", { required: true, min: 1 })}
              placeholder="10"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Product Image</span>
          </label>
          <input
            type="file"
            {...register("productImage", { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="btn btn-primary w-full text-white mt-4"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Add Asset"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
