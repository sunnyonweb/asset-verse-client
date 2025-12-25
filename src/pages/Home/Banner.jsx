import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlayCircle, FaCheckCircle } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative min-h-[95vh] bg-slate-50 overflow-hidden flex items-center">
      {/* Purple Blob */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[120px] opacity-70 animate-pulse"></div>
      {/* Blue Blob */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] opacity-70"></div>
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="container mx-auto px-4 z-10 relative mt-10 lg:mt-0">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* --- LEFT SIDE --- */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left space-y-7"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* New Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 shadow-sm text-blue-600 text-sm font-semibold mx-auto lg:mx-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              AssetVerse v1.0 is Live
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
              Smartest Way to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                Track Assets
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Empower your HR team and employees with a seamless asset
              management system. Say goodbye to spreadsheets and hello to
              automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link to="/join-hr">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary bg-gradient-to-r from-blue-600 to-violet-600 border-none text-white px-8 py-3 h-auto text-lg shadow-xl shadow-blue-500/30 rounded-full w-full sm:w-auto"
                >
                  Get Started Free
                </motion.button>
              </Link>
              <Link
                to="/join-employee"
                className="flex items-center justify-center gap-3 text-slate-700 font-bold hover:text-blue-600 transition-colors px-6 py-3"
              >
                <FaPlayCircle className="text-2xl text-blue-600" />
                <span>See How It Works</span>
              </Link>
            </div>

            <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-y-2 gap-x-6 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> No Credit Card
                Required
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> 14-Day Free Trial
              </span>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE --- */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 1. Main Dashboard Image  */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20"
            >
              <div className="bg-white p-2 rounded-2xl shadow-2xl border border-slate-200">
                <img
                  src="https://cdn.dribbble.com/users/1615584/screenshots/15710288/media/7b7d0b3c675303c72b2260f89838153c.jpg?compress=1&resize=1000x750&vertical=top"
                  alt="Asset Dashboard UI"
                  className="rounded-xl w-full object-cover"
                />

                {/* Overlay Gradient for Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
              </div>
            </motion.div>

            {/* 2. Floating Badge 1 */}
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-10 -left-6 z-30 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 max-w-[200px]"
            >
              <div className="bg-green-100 p-3 rounded-lg text-green-600 text-xl font-bold">
                98%
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Recovery Rate
                </p>
                <p className="font-bold text-slate-700">Assets Returned</p>
              </div>
            </motion.div>

            {/* 3. Floating Badge 2  */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -top-10 -right-6 z-10 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg border border-slate-100 flex items-center gap-3"
            >
              <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600">
                500+ Joining
              </span>
            </motion.div>

            {/* Background Glow behind Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
