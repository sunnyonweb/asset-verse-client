import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRocket, FaLaptop, FaUserShield } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative min-h-screen bg-base-100 overflow-hidden flex flex-col justify-center">
      {/* 1. Futuristic Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(#4f46e5 0.5px, transparent 0.5px), radial-gradient(#4f46e5 0.5px, #ffffff 0.5px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      ></div>

      {/* 2. Gradient Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[100px] animate-pulse"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* --- LEFT SIDE: TEXT CONTENT --- */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-base-200 border border-base-300 shadow-sm mb-2">
              <span className="text-primary font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                Live Asset Tracking System
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-gray-800 leading-[1.1]">
              Control Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-secondary">
                Corporate Assets
              </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 font-medium">
              A smart dashboard for HR Managers to track inventory and for
              Employees to request gear effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to="/join-hr">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary text-white px-8 py-3 h-auto text-lg shadow-xl shadow-primary/30 rounded-xl w-full sm:w-auto"
                >
                  Start as HR Manager
                </motion.button>
              </Link>
              <Link to="/join-employee">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-white text-gray-700 border border-gray-200 px-8 py-3 h-auto text-lg shadow-lg hover:bg-gray-50 rounded-xl w-full sm:w-auto"
                >
                  Join as Employee
                </motion.button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-4 opacity-70">
              <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-10">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-10">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-10">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold">Trusted by 100+ Companies</p>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: 3D FLOATING CARDS (NO IMAGE NEEDED) --- */}
          <motion.div
            className="lg:w-1/2 relative h-[500px] w-full flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Background Blob for Depth */}
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20"></div>

            {/* Card 1: Main Dashboard Card (Glassmorphism) */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-20 bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-2xl w-80 lg:w-96 top-10 lg:right-10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <FaLaptop size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Macbook Pro M2</h3>
                  <p className="text-xs text-gray-500">
                    Asset #8834 • Apple Inc.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg">
                <span className="text-sm font-semibold text-gray-600">
                  Stock
                </span>
                <span className="badge badge-success text-white">
                  12 Available
                </span>
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </motion.div>

            {/* Card 2: Request Card (Floating Opposite) */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute z-30 bg-white/80 backdrop-blur-md border border-white/60 p-4 rounded-xl shadow-xl w-64 -bottom-10 lg:bottom-10 left-4 lg:left-10"
            >
              <div className="flex items-center gap-3">
                <div className="avatar online">
                  <div className="w-10 rounded-full">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt="user"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold">New Request</p>
                  <p className="text-xs text-gray-500">
                    Sarah wants a Keyboard
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn btn-xs btn-primary w-full">
                  Approve
                </button>
                <button className="btn btn-xs btn-ghost w-full">Details</button>
              </div>
            </motion.div>

            {/* Card 3: Security Badge (Small) */}
            <motion.div
              animate={{ x: [0, 10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-10 top-0 left-10 lg:left-20 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2"
            >
              <FaRocket className="text-orange-500" />
              <span className="font-bold text-sm">Fast Deployment</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
