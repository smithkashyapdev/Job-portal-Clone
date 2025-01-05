import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

// Import your Publishable Key
const AppLayout = () => {
  
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen">
        <Header />
        <Outlet />
      </main>
      <div className="p-4 text-center bg-gray-800 mt-10">
        <p className="text-white text-sm">
          &copy; 2021 smith Tech. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AppLayout;