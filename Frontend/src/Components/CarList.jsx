import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate for navigation
import SearchBar from "../Components/SearchBar"; // Import SearchBar component

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const navigate = useNavigate(); // Hook to manage navigation

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("User not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/cars/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCars(response.data.cars);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch cars.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Handle the search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter cars based on the search query
  const filteredCars = cars.filter((car) => {
    return (
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const handleViewDetails = (carId) => {
    navigate(`/car/${carId}`); // Navigate to the car detail page
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-6xl font-bold mb-6 text-center text-blue-950">Your Cars</h1>
      {/* Include SearchBar here */}
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="items-center justify-center align-middle">
        {filteredCars.length > 0 ? (
          <div className="grid gap-10 grid-cols-4 p-8">
            {filteredCars.map((car) => (
              <div key={car._id} className="bg-white shadow-md rounded-lg mb-6 p-8">
                <h2 className="text-xl font-bold text-left">{car.title}</h2>
                <p className="text-gray-600 mt-2 text-left">
                  <span className="text-gray-800 mt-4 text-lg">Description:</span>{" "}
                  {car.description}
                </p>
                <p className="text-sm text-gray-500 mt-2 text-left">
                  <span className="text-gray-800 mt-4 text-lg">Tags:</span>{" "}
                  {car.tags.join(", ")}
                </p>
                <div className="mt-4 flex items-center justify-center align-middle">
                  <img
                    src={`http://localhost:5000/${car.images[0]}`}
                    alt={car.title}
                    className="w-64 h-56 object-cover rounded-md"
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => handleViewDetails(car._id)}
                    className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-900"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default CarList;
