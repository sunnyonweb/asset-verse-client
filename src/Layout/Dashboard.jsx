import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaPlusSquare,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [role] = useRole(); // 'hr' or 'employee'
  const { logOut } = useAuth();

  // Professional Styles for Links
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
      isActive
        ? "bg-primary text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100 hover:text-primary"
    }`;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="w-full navbar bg-base-100 lg:hidden shadow-sm">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-xl text-primary">
            AssetVerse
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu p-4 w-72 min-h-full bg-white text-base-content border-r border-gray-200 flex flex-col justify-between">
          <div>
            {/* Logo Area */}
            <div className="mb-8 px-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold text-gray-800 tracking-tight">
                AssetVerse
              </span>
            </div>

            {/* Navigation Links */}
            <ul className="space-y-2">
              {/* ---------- HR MANAGER ROUTES ---------- */}
              {role === "hr" && (
                <>
                  <li className="menu-title text-gray-400 uppercase text-xs font-bold mb-2 mt-2">
                    HR Management
                  </li>
                  <li>
                    <NavLink to="/dashboard/home" className={linkStyle}>
                      <FaHome /> Asset List (Home)
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/add-asset" className={linkStyle}>
                      <FaPlusSquare /> Add Asset
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/all-requests" className={linkStyle}>
                      <FaClipboardList /> All Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-employees" className={linkStyle}>
                      <FaUsers /> My Employee List
                    </NavLink>
                  </li>
                </>
              )}

              {/* ---------- EMPLOYEE ROUTES ---------- */}
              {role === "employee" && (
                <>
                  <li className="menu-title text-gray-400 uppercase text-xs font-bold mb-2 mt-2">
                    Employee Menu
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-assets" className={linkStyle}>
                      <FaBoxOpen /> My Assets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-team" className={linkStyle}>
                      <FaUsers /> My Team
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/request-asset"
                      className={linkStyle}
                    >
                      <FaPlusSquare /> Request Asset
                    </NavLink>
                  </li>
                </>
              )}

              {/* ---------- SHARED ROUTES ---------- */}
              <div className="divider my-4"></div>
              <li>
                <NavLink to="/dashboard/profile" className={linkStyle}>
                  <FaUserCircle /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={linkStyle}>
                  <FaHome /> Back to Home
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Footer / Logout */}
          <div className="mt-auto">
            <button
              onClick={logOut}
              className="btn btn-outline btn-error w-full flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
