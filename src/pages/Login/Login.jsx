import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [processing, setProcessing] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    setProcessing(true);
    signIn(data.email, data.password)
      .then((result) => {
        Swal.fire({
          title: "Welcome Back!",
          text: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
          icon: "success",
        });
        navigate(from, { replace: true });
        setProcessing(false);
      })
      .catch((error) => {
        setProcessing(false);
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  const handleGoogleSignIn = async () => {
    setProcessing(true);
    try {
      const result = await googleSignIn();
      const loggedUser = result.user;

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${loggedUser.email}`
      );

      if (data?.role) {
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      } else {
        navigate("/select-role", {
          state: {
            email: loggedUser.email,
            name: loggedUser.displayName,
            photo: loggedUser.photoURL,
          },
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    } finally {
      setProcessing(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-4xl w-full overflow-hidden">
        {/* Left Side Image */}
        <div className="lg:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="Office"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-white text-center p-6">
              <h2 className="text-4xl font-bold mb-2">AssetVerse</h2>
              <p className="text-lg opacity-90">
                Manage your corporate assets efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="card-body lg:w-1/2 p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-center text-primary mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Please login to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  Email is required
                </span>
              )}
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute top-4 left-3 text-gray-400" />
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                />
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  Password is required
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                disabled={processing}
                className="btn btn-primary w-full text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {processing ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className="divider text-gray-400">OR</div>

          <button
            onClick={handleGoogleSignIn}
            disabled={processing}
            className="btn btn-outline w-full hover:bg-gray-100 transition-all"
          >
            <FaGoogle className="mr-2 text-red-500" /> Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account? <br />
            <Link
              to="/join-employee"
              className="text-primary font-bold hover:underline"
            >
              Join as Employee
            </Link>
            <span className="mx-2">|</span>
            <Link
              to="/join-hr"
              className="text-secondary font-bold hover:underline"
            >
              Join as HR
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
