import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUser } from "react-icons/fa";

const MyEmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Affiliated Employees
  const {
    data: employees = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-employees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/affiliates/${user?.email}`);
      return res.data;
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove Employee?",
      text: "They will be removed from your team.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/affiliates/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Removed!", "Employee has been removed.", "success");
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        My Team Members ({employees.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="card bg-base-100 shadow-xl border border-gray-200"
          >
            <div className="card-body items-center text-center">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-20">
                  {emp.employeeImage ? (
                    <img src={emp.employeeImage} alt="profile" />
                  ) : (
                    <span className="text-3xl">
                      <FaUser />
                    </span>
                  )}
                </div>
              </div>
              <h2 className="card-title mt-2">{emp.employeeName}</h2>
              <p className="text-sm text-gray-500">{emp.employeeEmail}</p>

              <div className="card-actions mt-4 w-full">
                <button
                  onClick={() => handleRemove(emp._id)}
                  className="btn btn-error btn-outline btn-sm w-full"
                >
                  <FaTrashAlt className="mr-2" /> Remove from Team
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {employees.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500">
            No employees found. Approve asset requests to build your team.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyEmployeeList;
