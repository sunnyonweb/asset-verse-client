import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { imageUpload } from "../../utils/imageUpload";

const JoinHR = () => {
  const location = useLocation();
  const { email, name, photo } = location.state || {};
  const isGoogleLogin = !!email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: name || "", email: email || "" },
  });

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      const imageFile = data.companyLogo[0];
      const logoURL = await imageUpload(imageFile);

      if (!isGoogleLogin) {
        await createUser(data.email, data.password);
        await updateUserProfile(data.name, logoURL);
      } else {
        await updateUserProfile(data.name, photo);
      }

      const userInfo = {
        name: data.name,
        email: data.email,
        role: "hr",
        dateOfBirth: data.dateOfBirth,
        companyName: data.companyName,
        companyLogo: logoURL,
        packageLimit: 5,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        userInfo
      );

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "HR Setup Complete!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/home");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-secondary mb-6">
          {isGoogleLogin ? "Setup Company Profile" : "Register as HR Manager"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name *</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`input input-bordered ${
                  errors.name ? "input-error" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Date of Birth *
                </span>
              </label>
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
                className={`input input-bordered ${
                  errors.dateOfBirth ? "input-error" : ""
                }`}
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Company Name *</span>
              </label>
              <input
                type="text"
                {...register("companyName", {
                  required: "Company Name is required",
                })}
                className={`input input-bordered ${
                  errors.companyName ? "input-error" : ""
                }`}
              />
              {errors.companyName && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.companyName.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Company Logo *</span>
              </label>
              <input
                type="file"
                {...register("companyLogo", {
                  required: "Company Logo is required",
                })}
                className={`file-input file-input-bordered w-full ${
                  errors.companyLogo ? "input-error" : ""
                }`}
              />
              {errors.companyLogo && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.companyLogo.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email *</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              readOnly={isGoogleLogin}
              className={`input input-bordered ${
                isGoogleLogin ? "bg-gray-100" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {!isGoogleLogin && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password *</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 chars" },
                })}
                className={`input input-bordered ${
                  errors.password ? "input-error" : ""
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
          )}

          <button
            disabled={processing}
            className="btn btn-secondary w-full text-white mt-6"
          >
            {processing ? (
              <span className="loading loading-spinner"></span>
            ) : isGoogleLogin ? (
              "Complete Setup"
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinHR;
