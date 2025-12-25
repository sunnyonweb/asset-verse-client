import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    updateUserProfile(data.name, data.photoURL)
      .then(() => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile Updated!",
          showConfirmButton: false,
          timer: 1500,
        });

        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden mt-10">
      {/* Header Banner */}
      <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>

      <div className="px-8 pb-8">
        {/* Profile Image & Info */}
        <div className="relative flex justify-between items-end -mt-12 mb-6">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-white ring-offset-2 bg-base-100">
              <img
                src={user?.photoURL}
                referrerPolicy="no-referrer"
                alt="User"
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              Last Login: {user?.metadata?.lastSignInTime?.slice(0, 16)}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {user?.displayName}
          </h2>
          <p className="text-gray-500 font-medium">{user?.email}</p>
        </div>

        {/* Update Form */}
        <div className="divider">Update Profile</div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Full Name</span>
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("name")}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Photo URL</span>
            </label>
            <input
              type="text"
              defaultValue={user?.photoURL}
              {...register("photoURL")}
              className="input input-bordered w-full"
              placeholder="https://example.com/photo.jpg"
            />
            <label className="label">
              <span className="label-text-alt text-gray-400">
                Currently we support Image URLs only.
              </span>
            </label>
          </div>

          <button
            disabled={loading}
            className="btn btn-primary w-full text-white"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
