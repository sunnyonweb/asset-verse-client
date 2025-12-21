import React from "react";
import { FaBoxOpen, FaUsers, FaChartLine, FaHistory } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaBoxOpen className="text-4xl text-primary" />,
      title: "Asset Tracking",
      description:
        "Real-time tracking of returnable and non-returnable assets assigned to employees.",
    },
    {
      icon: <FaUsers className="text-4xl text-secondary" />,
      title: "Employee Management",
      description:
        "Easily add employees to your team and manage their access and requests.",
    },
    {
      icon: <FaHistory className="text-4xl text-accent" />,
      title: "Request History",
      description:
        "Keep a digital audit log of who requested what and when it was approved.",
    },
    {
      icon: <FaChartLine className="text-4xl text-info" />,
      title: "Smart Analytics",
      description:
        "Visualize your inventory status with intuitive dashboards and reports.",
    },
  ];

  return (
    <div className="py-20 bg-base-100 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Why Choose AssetVerse?</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We provide a comprehensive solution to stop asset loss and improve
          accountability within your organization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="card bg-base-100 shadow-xl border hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="card-body items-center text-center">
              <div className="mb-4 bg-base-200 p-4 rounded-full">
                {feature.icon}
              </div>
              <h2 className="card-title mb-2">{feature.title}</h2>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
