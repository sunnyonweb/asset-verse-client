import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserCircle, FaBuilding } from "react-icons/fa";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedHrEmail, setSelectedHrEmail] = useState(null);

  // 1. Fetch My Affiliations (Which companies I belong to)
  const { data: affiliations = [], isLoading: loadingAffiliations } = useQuery({
    queryKey: ["my-affiliations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-affiliations/${user?.email}`);
      // Set default selected company if available and not set
      if (res.data.length > 0 && !selectedHrEmail) {
        setSelectedHrEmail(res.data[0].hrEmail);
      }
      return res.data;
    },
  });

  // 2. Fetch Team Members (Based on selected HR)
  const { data: teamMembers = [], isLoading: loadingTeam } = useQuery({
    queryKey: ["team-members", selectedHrEmail],
    enabled: !!selectedHrEmail, // Only run if HR email is selected
    queryFn: async () => {
      const res = await axiosSecure.get(`/affiliates/${selectedHrEmail}`);
      return res.data;
    },
  });

  if (loadingAffiliations)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (affiliations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <FaBuilding className="text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600">Not Affiliated Yet</h2>
        <p className="text-gray-500 mt-2">
          Request an asset to join a company's team.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Meet Your Team</h2>

        {/* Company Selector */}
        {affiliations.length > 1 && (
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Select Company</span>
            </label>
            <select
              className="select select-bordered"
              onChange={(e) => setSelectedHrEmail(e.target.value)}
              value={selectedHrEmail || ""}
            >
              {affiliations.map((aff) => (
                <option key={aff._id} value={aff.hrEmail}>
                  {aff.companyName}
                </option>
              ))}
            </select>
          </div>
        )}
        {affiliations.length === 1 && (
          <div className="badge badge-lg badge-primary badge-outline mt-2 md:mt-0">
            {affiliations[0].companyName}
          </div>
        )}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Show loading for team fetch */}
        {loadingTeam ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : (
          teamMembers.map((member) => (
            <div
              key={member._id}
              className={`card shadow-lg border hover:shadow-xl transition-all ${
                member.employeeEmail === user.email
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white"
              }`}
            >
              <div className="card-body items-center text-center">
                <div className="avatar">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        member.employeeImage ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      referrerPolicy="no-referrer"
                      alt="profile"
                    />
                  </div>
                </div>
                <h3 className="card-title mt-2">
                  {member.employeeName}
                  {member.employeeEmail === user.email && (
                    <span className="badge badge-xs badge-primary">You</span>
                  )}
                </h3>
                <p className="text-sm text-gray-500">{member.employeeEmail}</p>
                <div className="mt-2 text-xs font-bold text-gray-400">
                  Member
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTeam;
