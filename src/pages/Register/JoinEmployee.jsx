import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const JoinEmployee = () => {
  const location = useLocation();
  const { email, name, photo } = location.state || {};
  const isGoogleLogin = !!email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name || "",
      email: email || "",
    },
  });

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      if (!isGoogleLogin) {
        await createUser(data.email, data.password);
        await updateUserProfile(
          data.name,
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        );
      }

      const userInfo = {
        name: data.name,
        email: data.email,
        role: "employee",
        dateOfBirth: data.dateOfBirth,
        profileImage: isGoogleLogin
          ? photo
          : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
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
          title: "Welcome!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/home");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: error.message });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isGoogleLogin ? "Complete Profile" : "Join as Employee"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Full Name *</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email *</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              readOnly={isGoogleLogin}
              className={`input input-bordered w-full ${
                isGoogleLogin ? "bg-gray-100 cursor-not-allowed" : ""
              } ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Date of Birth Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Date of Birth *</span>
            </label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
              })}
              className={`input input-bordered w-full ${
                errors.dateOfBirth ? "input-error" : ""
              }`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Password Field  */}
          {!isGoogleLogin && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password *</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          <button
            disabled={processing}
            className="btn btn-primary w-full text-white mt-4"
          >
            {processing ? (
              <span className="loading loading-dots"></span>
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

export default JoinEmployee;
