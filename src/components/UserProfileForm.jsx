import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../store/slices/userSlice";
import axiosInstance from "../utils/axiosInstance";

const preferencesList = ["Veg", "Non veg", "Italic", "Continental", "Chinese"];

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const user = useSelector((state) => state.user.user); // To get email from login

  const [formData, setFormData] = useState({
    email: user?.email || "",
    nickname: "",
    description: "",
    preferences: [],
    dob: "",
    gender: "",
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        email: user?.email || "",
        nickname: userProfile.nickname || "",
        description: userProfile.description || "",
        preferences: userProfile.preferences || [],
        dob: userProfile.dob || "",
        gender: userProfile.gender || "",
      });
    }
  }, [userProfile, user]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        preferences: prev.preferences.includes(value)
          ? prev.preferences.filter((pref) => pref !== value)
          : [...prev.preferences, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`/user/update-profile`, formData);
      if (res.data.success) {
        dispatch(setUserProfile(res.data.userProfile));
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 my-6 bg-gray-300 rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold">User Profile</h2>

      {/* Email */}
      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          placeholder="Enter your email"
          required
          readOnly
        />
      </div>

      {/* Nickname */}
      <div>
        <label className="block font-medium">Nickname</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          placeholder="Enter your nickname"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium">User Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full mt-1 p-2 border rounded"
          placeholder="Tell us about yourself"
        />
      </div>

      {/* Preferences */}
      <div>
        <label className="block font-medium">Preferences</label>
        <div className="mt-2 space-y-2">
          {preferencesList.map((pref) => (
            <label key={pref} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="preferences"
                value={pref}
                checked={formData.preferences.includes(pref)}
                onChange={handleChange}
              />
              <span>{pref}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block font-medium">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block font-medium">Gender</label>
        <div className="flex space-x-6 mt-2">
          {["Male", "Female", "Other"].map((gender) => (
            <label key={gender} className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={handleChange}
              />
              <span>{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;
