import React from "react";

const Packages = () => {
  const packages = [
    {
      name: "Basic",
      price: 5,
      limit: 5,
      features: [
        "5 Employees",
        "Basic Asset Tracking",
        "Email Support",
        "Standard Dashboard",
      ],
    },
    {
      name: "Standard",
      price: 8,
      limit: 10,
      features: [
        "10 Employees",
        "Advanced Tracking",
        "Priority Support",
        "Analytics Charts",
      ],
      recommended: true,
    },
    {
      name: "Premium",
      price: 15,
      limit: 20,
      features: [
        "20 Employees",
        "Full API Access",
        "24/7 Support",
        "Custom Branding",
      ],
    },
  ];

  return (
    <div className="py-20 bg-base-200 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Affordable Packages</h2>
        <p className="text-gray-500">
          Choose a plan that fits your company size.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`card bg-base-100 shadow-xl relative ${
              pkg.recommended
                ? "border-2 border-primary transform scale-105 z-10"
                : ""
            }`}
          >
            {pkg.recommended && (
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMMENDED
              </div>
            )}
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">{pkg.name}</h2>
              <div className="my-4">
                <span className="text-4xl font-bold">${pkg.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="font-semibold text-gray-600 mb-4">
                Up to {pkg.limit} Employees
              </p>

              <ul className="space-y-2 mb-6 text-left w-full pl-8">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <div className="card-actions w-full">
                <button
                  className={`btn w-full ${
                    pkg.recommended ? "btn-primary" : "btn-outline"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
