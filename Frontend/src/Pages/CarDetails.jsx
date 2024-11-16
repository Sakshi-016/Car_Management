import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DeleteButton from "../Components/DeleteButton";
import UpdateButton from "../Components/UpdateButton";
const CarDetail = () => {
  const { carId } = useParams(); // Get the car ID from the URL params
  const navigate = useNavigate(); // For navigation
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("User not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/cars/${carId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCar(response.data.car);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleUpdate = () => {
    // Navigate to the update form with carId
    navigate(`/car/update/${carId}`);
  };
  

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-600 text-lg">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      {car && (
        <div className="bg-white shadow-md rounded-lg p-6 ">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{car.title}</h1>

          <span> Description:</span><p className="text-lg text-gray-700">{car.description}</p>

          <span> Tags:</span> <p className="text-sm text-gray-500 mt-2">Tags: {car.tags.join(", ")}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {car.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${image}`}
                alt={car.title}
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>

          {/* Update and Delete Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"

            >
              Update
            </button>
            <DeleteButton carId={carId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;
