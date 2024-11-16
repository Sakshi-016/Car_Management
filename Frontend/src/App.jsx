import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar"; 
import AddCar from "./Pages/AddCar";
import CarDetail from "./Pages/CarDetails";
import CarList from "../Components/CarList.jsx";
import UpdateButton from "./Components/UpdateButton";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Components/AuthProvider"; // Import AuthProvider

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  // Function to handle search input from the Navbar
  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query
  };

  return (
    <AuthProvider>  {/* Wrap your app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <MainContent handleSearch={handleSearch} searchQuery={searchQuery} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function MainContent({ handleSearch, searchQuery }) {
  return (
    <div>
      <Navbar onSearch={handleSearch} />{" "}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addcar" element={<AddCar />} />
        <Route path="/car/:carId" element={<CarDetail />} />
        <Route path="/car/update/:carId" element={<UpdateButton />} />
        <Route path="/dashboard" element={<CarList searchQuery={searchQuery} />} />
      </Routes>
    </div>
  );
}

export default App;
