import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import JoinEmployee from "../pages/Register/JoinEmployee";
import JoinHR from "../pages/Register/JoinHR";
import PrivateRoute from "./PrivateRoute"; // Import
import Dashboard from "../Layout/Dashboard";

// Placeholder Components (আমরা পরে এগুলো আসল ফাইল দিয়ে রিপ্লেস করবো)
const AssetList = () => <div>Asset List Component</div>;
const MyAssets = () => <div>My Assets Component</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/join-employee", element: <JoinEmployee /> },
      { path: "/join-hr", element: <JoinHR /> },
    ],
  },
  // Dashboard Routes
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ), // পুরো ড্যাশবোর্ড প্রোটেক্টেড
    children: [
      // HR Routes
      { path: "home", element: <AssetList /> }, // Default HR Home
      { path: "add-asset", element: <div>Add Asset Page</div> },
      { path: "all-requests", element: <div>All Requests Page</div> },
      { path: "my-employees", element: <div>My Employees Page</div> },

      // Employee Routes
      { path: "my-assets", element: <MyAssets /> },
      { path: "my-team", element: <div>My Team Page</div> },
      { path: "request-asset", element: <div>Request Asset Page</div> },

      // Shared
      { path: "profile", element: <div>Profile Page</div> },
    ],
  },
]);
