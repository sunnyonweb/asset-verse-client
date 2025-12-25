import React, { useState, useEffect } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Testimonials = () => {
  // 1. More Testimonials Data
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "HR Manager, TechFlow",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      review:
        "AssetVerse changed how we handle our inventory. Tracking laptops and licenses has never been this easy. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO, Startup Inc.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      review:
        "The API integration is flawless. We connected it with our internal tools in minutes. A robust solution for asset management.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Operations Head, LogiCorp",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      review:
        "Finally, a system that employees actually like using. The request flow is intuitive and saves us hours of email threads.",
      rating: 4,
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Admin, EduCare",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      review:
        "The returnable asset tracking feature saved us thousands of dollars in lost equipment this year alone.",
      rating: 5,
    },
    {
      id: 5,
      name: "Jessica Brown",
      role: "HR Specialist, Softify",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      review:
        "Customer support is top-notch. They helped us migrate our old excel sheets to AssetVerse seamlessly.",
      rating: 5,
    },
    {
      id: 6,
      name: "Robert Fox",
      role: "Manager, ConstructCo",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      review:
        "Simple, clean, and effective. It does exactly what it promises without unnecessary bloatware.",
      rating: 4,
    },
  ];

  // 2. Slider Logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive Items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (reviews.length - itemsPerPage + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - itemsPerPage : prev - 1
    );
  };

  // Auto Play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= reviews.length - itemsPerPage) return 0;
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [itemsPerPage]);

  return (
    <div className="py-24 bg-gradient-to-b from-base-100 to-base-200 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="badge badge-secondary badge-outline mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Trusted by <span className="text-primary">Industry Leaders</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            See what HR Managers and CEOs are saying about their experience with
            AssetVerse.
          </p>
        </div>

        {/* --- SLIDER CONTAINER --- */}
        <div className="relative max-w-7xl mx-auto">
          {/* Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 btn btn-circle btn-primary text-white shadow-lg hidden md:flex"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 btn btn-circle btn-primary text-white shadow-lg hidden md:flex"
          >
            <FaChevronRight />
          </button>

          {/* Viewport */}
          <div className="overflow-hidden p-4">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ width: `${(reviews.length / itemsPerPage) * 100}%` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="relative flex-shrink-0 w-full md:w-[48%] lg:w-[32%]"
                  style={{ width: `${100 / reviews.length}%` }}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col relative group">
                    {/* Quote Icon Background */}
                    <FaQuoteLeft className="absolute top-6 right-6 text-6xl text-gray-100 group-hover:text-primary/10 transition-colors" />

                    {/* Rating */}
                    <div className="flex gap-1 text-yellow-400 mb-4 text-sm">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 italic mb-6 leading-relaxed relative z-10 flex-grow">
                      "{review.review}"
                    </p>

                    {/* User Info */}
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={review.image} alt={review.name} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {review.name}
                        </h4>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                          {review.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Navigation  */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(reviews.length - itemsPerPage + 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "bg-primary w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
