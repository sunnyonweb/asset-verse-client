import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserTie, FaUsers } from "react-icons/fa";

const SelectRole = () => {
  // গুগল থেকে পাওয়া ডাটাগুলো এখানে রিসিভ করছি
  const location = useLocation();
  const { email, name, photo } = location.state || {};

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        {photo && (
          <img
            src={photo}
            alt="User"
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-primary"
          />
        )}
        <h1 className="text-4xl font-bold mb-2">Welcome, {name}!</h1>
        <p className="text-xl text-gray-500">
          To continue, please select your role.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {/* Employee Card */}
        <div className="card w-full md:w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-transparent hover:border-primary cursor-pointer group">
          <div className="card-body items-center text-center">
            <FaUsers className="text-6xl text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="card-title text-2xl">I am an Employee</h2>
            <p className="text-gray-500">
              I want to join a team and request assets.
            </p>
            <div className="card-actions mt-6">
              <Link
                to="/join-employee"
                state={{ email, name }} // ডাটা পাঠিয়ে দিচ্ছি যাতে ফর্ম ফিলাপ করা থাকে
                className="btn btn-primary text-white w-full"
              >
                Join as Employee
              </Link>
            </div>
          </div>
        </div>

        {/* HR Card */}
        <div className="card w-full md:w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-transparent hover:border-secondary cursor-pointer group">
          <div className="card-body items-center text-center">
            <FaUserTie className="text-6xl text-secondary mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="card-title text-2xl">I am an HR Manager</h2>
            <p className="text-gray-500">
              I want to manage company assets and employees.
            </p>
            <div className="card-actions mt-6">
              <Link
                to="/join-hr"
                state={{ email, name }} // ডাটা পাঠিয়ে দিচ্ছি
                className="btn btn-secondary text-white w-full"
              >
                Join as HR Manager
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
