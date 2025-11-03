// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const token = await login(credentials); // get token directly
    console.log("✅ Login Successful:", token);

    localStorage.setItem("token", token);

    // decode payload
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded Payload:", payload);

    const role = payload.role?.toUpperCase();

    if (role === "ADMIN") navigate("/admin/dashboard", { replace: true });
    else if (role === "INSTRUCTOR") navigate("/instructor/dashboard", { replace: true });
    else if (role === "STUDENT") navigate("/student/dashboard", { replace: true });
    else navigate("/login", { replace: true });
  } catch (err) {
    console.error("❌ Login Failed:", err);
    setError(err.response?.data?.message || "Invalid credentials");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
