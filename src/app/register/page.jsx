"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Tel_no: "",
    role: "",
    description: "",
    youtubeURL: "",
    facebookURL: "",
    instagramURL: "",
    imageProfile: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageProfile" && files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        imageProfile: file,
      }));

      if (typeof window !== "undefined") {
        setImagePreview(URL.createObjectURL(file)); // สร้าง URL สำหรับแสดงรูป
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "imageProfile" && formData[key]) {
        form.append(key, formData[key]);
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        alert("User created successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating user");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto mt-32 p-6 mb-12 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-lg">
        {" "}
        {/* เพิ่ม mt-16 */}
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        {/* แสดงรูปภาพที่เลือก */}
        <div className="mb-4 text-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Selected Profile"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex justify-center items-center text-gray-500">
              No Image
            </div>
          )}
          <label
            htmlFor="imageProfile"
            className="block text-sm font-medium text-gray-700 cursor-pointer"
          >
            <span className="bg-indigo-600 text-white px-4 py-2 rounded-full inline-block cursor-pointer hover:bg-indigo-700">
              Choose Image
            </span>
          </label>
          <input
            type="file"
            id="imageProfile"
            name="imageProfile"
            onChange={handleChange}
            className="mt-1 block w-full hidden" // ซ่อน input file
          />
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="password"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="Tel_no"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="Tel_no"
              name="Tel_no"
              value={formData.Tel_no}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="USER">User</option>
              <option value="PRODUCER">Producer</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="describe yourself"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="youtubeURL"
              className="block text-sm font-medium text-gray-700"
            >
              YouTube URL
            </label>
            <input
              type="url"
              id="youtubeURL"
              name="youtubeURL"
              placeholder="URL to your YouTube channel"
              value={formData.youtubeURL}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="facebookURL"
              className="block text-sm font-medium text-gray-700"
            >
              Facebook URL
            </label>
            <input
              type="url"
              id="facebookURL"
              name="facebookURL"
              placeholder="URL to your facebook channel"
              value={formData.facebookURL}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="instagramURL"
              className="block text-sm font-medium text-gray-700"
            >
              Instagram URL
            </label>
            <input
              type="url"
              id="instagramURL"
              name="instagramURL"
              placeholder="URL to your instagram channel"
              value={formData.instagramURL}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
