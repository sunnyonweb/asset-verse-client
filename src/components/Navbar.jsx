import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : "font-medium"
          }
        >
          Home
        </NavLink>
      </li>

      {/* ইউজার না থাকলে Join অপশন দেখাবে */}
      {!user && (
        <>
          <li>
            <NavLink
              to="/join-employee"
              className={({ isActive }) =>
                isActive ? "font-bold text-primary" : "font-medium"
              }
            >
              Join as Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/join-hr"
              className={({ isActive }) =>
                isActive ? "font-bold text-primary" : "font-medium"
              }
            >
              Join as HR Manager
            </NavLink>
          </li>
        </>
      )}

      {/* ইউজার থাকলে Dashboard বাটন দেখাবে */}
      {user && (
        <li>
          <NavLink to="/dashboard/home" className="font-bold text-primary">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2"
          >
            {navOptions}
          </ul>
        </div>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AssetVerse
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{navOptions}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border border-primary/20 hover:border-primary"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
                  src={
                    user?.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  referrerPolicy="no-referrer" // Google Image Fix
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200"
            >
              <li className="px-4 py-2 text-center border-b border-base-200">
                <p className="font-bold text-primary truncate">
                  {user?.displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </li>
              <li>
                <Link to="/dashboard/profile" className="justify-between mt-2">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-500 font-bold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary btn-sm px-6 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
