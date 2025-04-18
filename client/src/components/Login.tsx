import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { API_ROUTES } from "../utils/api";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await api.post(API_ROUTES.LOGIN, { username, password });
      if (response.data.token) {
        // Save the token in localStorage
        localStorage.setItem("token", response.data.token);
        // Redirect to home page after successful login
        navigate("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png" // Replace with the actual path to your logo
            alt="WekeyarPlus"
            className="w-full h-24"
          />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Welcome to WekeyarPlus
        </h2>
        {error && (
          <div className="mb-4 text-red-600 text-center text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
