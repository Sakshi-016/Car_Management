import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteButton = () => {
  const { carId } = useParams(); // Extract carId from the URL
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      // Delete request to the backend
      await axios.delete(`http://localhost:5000/api/cars/delete/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Car deleted successfully!");
      navigate("/dashboard"); // Redirect to the dashboard page after deletion
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete the car.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
