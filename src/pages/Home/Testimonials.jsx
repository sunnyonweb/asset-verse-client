import React from "react";

const Testimonials = () => {
  return (
    <div className="py-20 bg-white px-4">
      {/* Stats Section */}
      <div className="flex flex-col md:flex-row justify-center gap-10 mb-20 text-center">
        <div className="stat place-items-center">
          <div className="stat-value text-primary">100+</div>
          <div className="stat-desc">Companies Registered</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-value text-secondary">5,000+</div>
          <div className="stat-desc">Assets Tracked</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-value text-accent">98%</div>
          <div className="stat-desc">Customer Satisfaction</div>
        </div>
      </div>

      {/* Testimonials */}
      <h2 className="text-4xl font-bold text-center mb-12">
        Trusted by Leaders
      </h2>
      <div className="carousel w-full max-w-4xl mx-auto space-x-4 p-4">
        <div className="carousel-item w-full md:w-1/2">
          <div className="card bg-base-200 p-6 w-full">
            <p className="italic">
              "AssetVerse changed how we handle our inventory. No more lost
              laptops!"
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div>
                <h4 className="font-bold">Sarah Jenkins</h4>
                <p className="text-xs">HR Manager, TechFlow</p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item w-full md:w-1/2">
          <div className="card bg-base-200 p-6 w-full">
            <p className="italic">
              "The employee request system is seamless. Highly recommended."
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div>
                <h4 className="font-bold">Mark D.</h4>
                <p className="text-xs">CEO, StartUp Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
