import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative min-h-[90vh] bg-base-100 overflow-hidden flex items-center">
      {/* Background Decorative Blobs (Blur Effect) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 py-12 lg:flex lg:items-center lg:gap-12 relative z-10">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge badge-outline badge-primary font-bold mb-4 p-4">
              🚀 The Future of HR Management
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gray-800">
              Manage Assets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Without Chaos
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Stop losing track of company equipment. Streamline your inventory,
              manage employee requests, and automate returns with AssetVerse.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/join-hr">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary text-white px-8 h-12 text-lg shadow-lg hover:shadow-primary/50 w-full sm:w-auto"
                >
                  Join as HR Manager
                </motion.button>
              </Link>
              <Link to="/join-employee">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-secondary px-8 h-12 text-lg w-full sm:w-auto"
                >
                  Join as Employee
                </motion.button>
              </Link>
            </div>

            {/* Stats / Trust Badges */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 border-t pt-6 border-gray-200">
              <div>
                <h3 className="text-3xl font-bold text-gray-800">500+</h3>
                <p className="text-sm text-gray-500">Companies</p>
              </div>
              <div className="divider divider-horizontal"></div>
              <div>
                <h3 className="text-3xl font-bold text-gray-800">10k+</h3>
                <p className="text-sm text-gray-500">Assets Tracked</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Floating Image Animation */}
        <motion.div
          className="lg:w-1/2 mt-12 lg:mt-0 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Floating Effect on the Image */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/asset-management-illustration-download-in-svg-png-gif-file-formats--digital-folder-data-processing-business-pack-illustrations-3790937.png"
              alt="Asset Management Illustration"
              className="w-full drop-shadow-2xl"
            />
          </motion.div>

          {/* Decorative Circle Behind Image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-2xl -z-10"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
