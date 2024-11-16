import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Remove token from local storage
    navigate("/"); // Redirect to login page
  };

  // Handle Add Car button click
  const handleAddCar = () => {
    navigate("/addcar"); // Redirect to Add Car page
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      {/* Logo */}
      <div className="text-3xl font-bold">
        <h2>Car Management</h2>
      </div>

    
      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAddCar}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          Add Car
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
