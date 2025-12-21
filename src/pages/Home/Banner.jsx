import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-[600px]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80)",
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-3xl">
          <h1 className="mb-5 text-5xl font-bold leading-tight">
            Manage Your Corporate Assets{" "}
            <span className="text-primary">Efficiently</span>
          </h1>
          <p className="mb-8 text-lg">
            AssetVerse helps companies track assets, manage employee requests,
            and streamline inventory usage. Join the future of corporate asset
            management today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/join-hr"
              className="btn btn-primary text-white border-none px-8"
            >
              Join as HR Manager
            </Link>
            <Link
              to="/join-employee"
              className="btn btn-secondary text-white border-none px-8"
            >
              Join as Employee
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
