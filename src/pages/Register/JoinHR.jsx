import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { imageUpload } from "../../utils/imageUpload";

const JoinHR = () => {
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
      const imageFile = data.companyLogo[0];
      const logoURL = await imageUpload(imageFile);

      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, logoURL);

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
          title: "HR Manager Account Created!",
          text: "Please Login to setup your dashboard.",
          showConfirmButton: true,
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center py-10 px-4">
      <div className="max-w-6xl w-full bg-base-100 shadow-2xl rounded-xl overflow-hidden flex flex-col-reverse lg:flex-row">
        {/* Form Section */}
        <div className="lg:w-3/5 p-8 lg:p-12">
          <div className="mb-8">
            <span className="badge badge-secondary badge-outline mb-2">
              For Managers
            </span>
            <h2 className="text-4xl font-bold text-gray-800">
              Start Your Journey
            </h2>
            <p className="text-gray-500 mt-2">
              Create a company profile and manage assets efficiently.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered"
                  placeholder="Your Name"
                />
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
                  className="input input-bordered"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Company Name</span>
                </label>
                <input
                  type="text"
                  {...register("companyName", { required: true })}
                  className="input input-bordered"
                  placeholder="Brand Name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Company Logo</span>
                </label>
                <input
                  type="file"
                  {...register("companyLogo", { required: true })}
                  className="file-input file-input-bordered w-full"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered"
                placeholder="hr@company.com"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={processing}
              className="btn btn-secondary w-full text-white text-lg mt-4 shadow-lg"
            >
              {processing ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Register as HR Manager"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-secondary font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Right Side Info Section */}
        <div className="lg:w-2/5 bg-secondary text-white flex flex-col justify-between p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-white opacity-10"></div>

          <div className="z-10">
            <h3 className="text-3xl font-bold mb-6">Why AssetVerse?</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="bg-white text-secondary rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  ✓
                </span>
                Easy Asset Tracking
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-white text-secondary rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  ✓
                </span>
                Employee Management
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-white text-secondary rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  ✓
                </span>
                Automated Reports
              </li>
            </ul>
          </div>

          <div className="mt-10 z-10">
            <p className="italic opacity-80">
              "The best solution for managing corporate resources efficiently."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinHR;
