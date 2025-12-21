import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../layout/Dashboard";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import JoinEmployee from "../pages/Register/JoinEmployee";
import JoinHR from "../pages/Register/JoinHR";
import PrivateRoute from "./PrivateRoute";
import HRRoute from "./HRRoute";

// --- HR Real Pages ---
import AddAsset from "../pages/Dashboard/HR/AddAsset";
import AssetList from "../pages/Dashboard/HR/AssetList";

// --- Employee Real Pages ---
import RequestAsset from "../pages/Dashboard/Employee/RequestAsset";
import MyAssets from "../pages/Dashboard/Employee/MyAssets";

// --- Placeholder Components (যে পেজগুলো এখনো বানানো হয়নি) ---
const AllRequests = () => (
  <div className="p-10 text-2xl font-bold">All Requests Page (Coming Soon)</div>
);
const MyEmployeeList = () => (
  <div className="p-10 text-2xl font-bold">My Employee List (Coming Soon)</div>
);
const MyTeam = () => (
  <div className="p-10 text-2xl font-bold">My Team Page (Coming Soon)</div>
);
const Profile = () => (
  <div className="p-10 text-2xl font-bold">Profile Page (Coming Soon)</div>
);

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/join-employee",
        element: <JoinEmployee />,
      },
      {
        path: "/join-hr",
        element: <JoinHR />,
      },
    ],
  },
  // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // --- HR ROUTES ---
      {
        path: "home", // HR Default Dashboard
        element: (
          <HRRoute>
            <AssetList />
          </HRRoute>
        ),
      },
      {
        path: "add-asset",
        element: (
          <HRRoute>
            <AddAsset />
          </HRRoute>
        ),
      },
      {
        path: "all-requests",
        element: (
          <HRRoute>
            <AllRequests />
          </HRRoute>
        ),
      },
      {
        path: "my-employees",
        element: (
          <HRRoute>
            <MyEmployeeList />
          </HRRoute>
        ),
      },

      // --- EMPLOYEE ROUTES ---
      {
        path: "my-assets",
        element: <MyAssets />, // This is already protected by the parent <PrivateRoute>
      },
      {
        path: "my-team",
        element: <MyTeam />,
      },
      {
        path: "request-asset",
        element: <RequestAsset />,
      },

      // --- SHARED ROUTES ---
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
