import React from "react";
import {
  FaLaptopCode,
  FaHeartbeat,
  FaIndustry,
  FaGraduationCap,
  FaLandmark,
  FaShoppingCart,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Industries = () => {
  const industries = [
    {
      id: 1,
      title: "IT & Tech",
      description:
        "Streamline your IT asset management with comprehensive tracking and maintenance solutions.",
      icon: <FaLaptopCode />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      id: 2,
      title: "Healthcare",
      description:
        "Manage medical equipment and resources efficiently while ensuring compliance with regulations.",
      icon: <FaHeartbeat />,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
    {
      id: 3,
      title: "Manufacturing",
      description:
        "Keep track of machinery, equipment, and production assets to optimize operations.",
      icon: <FaIndustry />,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      id: 4,
      title: "Education",
      description:
        "Monitor and maintain educational resources, devices, and facilities effectively.",
      icon: <FaGraduationCap />,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      id: 5,
      title: "Government & Public Sector",
      description:
        "Ensure transparent and efficient management of public assets and resources.",
      icon: <FaLandmark />,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      id: 6,
      title: "Retail & E-commerce",
      description:
        "Track inventory, manage store assets, and optimize your retail operations seamlessly.",
      icon: <FaShoppingCart />,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
    },
  ];

  return (
    <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Industries We Serve
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Our asset management solutions are tailored to meet the unique needs
            of various industries, providing specialized features for different
            sectors.
          </motion.p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-[#1E293B] border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Icon Box */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3 text-gray-100 group-hover:text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>

              {/* Hover Decoration */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
