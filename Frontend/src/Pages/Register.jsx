import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true, // Include credentials (cookies)
        }
      );
      sessionStorage.setItem("token", response.data.token); // Store token in localStorage
      navigate("/dashboard"); // Redirect to dashboard or another page
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-700">Register</h2>
        <form onSubmit={handleRegister} className="mt-4 space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label
              htmlFor="username"
              className="block text-xl font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-xl font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xl font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-between items-center gap-4">
            <button
              type="submit"
              className="py-2 px-12 bg-gray-700 text-white text-lg font-semibold rounded-md hover:bg-gray-800"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="py-2 px-16 bg-gray-300 text-gray-800 text-lg font-semibold rounded-md hover:bg-gray-700  hover:text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
