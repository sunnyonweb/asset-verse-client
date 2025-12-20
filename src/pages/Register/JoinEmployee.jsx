import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const JoinEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile(
        data.name,
        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      );

      const userInfo = {
        name: data.name,
        email: data.email,
        role: "employee",
        dateOfBirth: data.dateOfBirth,
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
          title: "Account Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
      <div className="max-w-5xl w-full bg-base-100 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Banner Image Section */}
        <div className="md:w-2/5 bg-primary relative flex flex-col justify-center items-center text-white p-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-30"></div>
          <h2 className="text-4xl font-bold z-10 mb-4">Join the Team</h2>
          <p className="z-10 text-center text-lg">
            Connect with your company, request assets, and track your inventory
            seamlessly.
          </p>
        </div>

        {/* Form Section */}
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Employee Registration
            </h2>
            <p className="text-gray-500">Create your personal account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="John Doe"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">Name is required</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="john@example.com"
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    Email is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Date of Birth
                  </span>
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="******"
                className="input input-bordered w-full"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  Min 6 characters required
                </span>
              )}
            </div>

            <button
              disabled={processing}
              className="btn btn-primary w-full text-white text-lg mt-6"
            >
              {processing ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinEmployee;
