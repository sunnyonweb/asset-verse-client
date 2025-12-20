import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      {/* Navbar Added Here */}
      <Navbar />

      <div className="min-h-[calc(100vh-288px)]">
        <Outlet />
      </div>

      <footer className="footer footer-center p-10 bg-base-300 text-base-content mt-10">
        <aside>
          <p className="font-bold">
            AssetVerse Ltd. <br />
            Providing reliable asset management since 2024
          </p>
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default MainLayout;

