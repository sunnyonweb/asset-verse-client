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
      const imageFile = data.productImage[0];
      const imageURL = await imageUpload(imageFile);

      const assetData = {
        productName: data.productName,
        productImage: imageURL,
        productType: data.productType,
        productQuantity: parseInt(data.productQuantity),
        availableQuantity: parseInt(data.productQuantity),
        hrEmail: user?.email,
        companyName: user?.displayName,
        dateAdded: new Date(),
      };

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
            <span className="label-text font-bold">Product Name *</span>
          </label>
          <input
            type="text"
            {...register("productName", {
              required: "Product name is required",
            })}
            placeholder="e.g. Macbook Pro M2"
            className={`input input-bordered w-full ${
              errors.productName ? "input-error" : ""
            }`}
          />
          {errors.productName && (
            <span className="text-red-500 text-xs mt-1">
              {errors.productName.message}
            </span>
          )}
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          {/* Product Type */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Product Type *</span>
            </label>
            <select
              {...register("productType", { required: "Please select a type" })}
              className="select select-bordered w-full"
            >
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Quantity *</span>
            </label>
            <input
              type="number"
              {...register("productQuantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Min 1" },
              })}
              placeholder="10"
              className={`input input-bordered w-full ${
                errors.productQuantity ? "input-error" : ""
              }`}
            />
            {errors.productQuantity && (
              <span className="text-red-500 text-xs mt-1">
                {errors.productQuantity.message}
              </span>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Product Image *</span>
          </label>
          <input
            type="file"
            {...register("productImage", { required: "Image is required" })}
            className={`file-input file-input-bordered w-full ${
              errors.productImage ? "input-error" : ""
            }`}
          />
          {errors.productImage && (
            <span className="text-red-500 text-xs mt-1">
              {errors.productImage.message}
            </span>
          )}
        </div>

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
