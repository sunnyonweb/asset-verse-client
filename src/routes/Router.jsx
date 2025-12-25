import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

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

import MyTeam from "../pages/Dashboard/Employee/MyTeam";
import Profile from "../pages/Dashboard/Shared/Profile";
import SelectRole from "../pages/Register/SelectRole";
import UpdateAsset from "../pages/Dashboard/HR/UpdateAsset";
import Dashboard from "../Layout/Dashboard";

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
      {
        path: "/select-role",
        element: <SelectRole />,
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
      // --- HR ROUTES  ---
      {
        path: "home",
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
      {
        path: "update-asset/:id",
        element: (
          <HRRoute>
            <UpdateAsset />
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
