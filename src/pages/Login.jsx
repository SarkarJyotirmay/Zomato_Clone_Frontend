import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const notify = () => toast.success("Login Successful");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // 👉 Write your login API logic here
    const response = await axiosInstance.post(`/user/login`, formData, {
      headers: {
        "Content-Type": "application/json", // for raw JSON body
      },
    });
    console.log(response.data.user);
    localStorage.setItem("token", response.data.token);
    dispatch(setUser(response.data.user));
    setFormData({ email: "", password: "" });
    notify();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 z-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-800 p-6 rounded-md"
      >
        <h2 className="text-center text-lg font-medium text-orange-400 mb-6">
          Login
        </h2>

        {error && (
          <p className="text-sm text-red-400 text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="text-sm text-gray-300 block mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="text-sm text-gray-300 block mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Sign In
        </button>
        <p className="text-gray-200 my-2 text-center">
          Don't have an account?{" "}
          <Link
            className="text-blue-500 hover:text-blue700 font-semibold"
            to={"/signup"}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
