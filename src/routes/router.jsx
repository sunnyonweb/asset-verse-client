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
import AllRequests from "../pages/Dashboard/HR/AllRequests";
import MyEmployeeList from "../pages/Dashboard/HR/MyEmployeeList";

// --- Employee Real Pages ---
import RequestAsset from "../pages/Dashboard/Employee/RequestAsset";
import MyAssets from "../pages/Dashboard/Employee/MyAssets";

// --- Placeholder Components (যে পেজগুলো এখনো বানানো হয়নি) ---
// আমরা পরের ধাপে Profile এবং MyTeam বানাবো
const MyTeam = () => (
  <div className="p-10 text-2xl font-bold text-gray-500">
    My Team Page (Coming Soon...)
  </div>
);
const Profile = () => (
  <div className="p-10 text-2xl font-bold text-gray-500">
    Profile Page (Coming Soon...)
  </div>
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

  // Dashboard Routes (Protected)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // --- HR ROUTES (Protected by HRRoute) ---
      {
        path: "home", // HR Default Home (Asset List)
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
        element: <MyAssets />,
      },
      {
        path: "request-asset",
        element: <RequestAsset />,
      },
      {
        path: "my-team",
        element: <MyTeam />,
      },

      // --- SHARED ROUTES ---
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
