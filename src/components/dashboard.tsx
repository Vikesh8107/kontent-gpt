import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [error, setError] = useState<string>("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Profile</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <strong>Email:</strong> {currentUser?.email}
        </div>
        <Link
          to="/update-profile"
          className="block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full"
        >
          Update Profile
        </Link>
      </div>
      <div className="w-full max-w-md text-center mt-4">
        <button
          onClick={handleLogout}
          className="text-blue-500 hover:underline"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
