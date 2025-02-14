"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Register() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      Tel_no: "",
      role: "user",
      imageProfile: null,
      previewImage: null,
      description: "",
      youtubeURL: "",
      facebookURL: "",
      instagramURL: ""
    });
    const router = useRouter();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData({ 
          ...formData, 
          imageProfile: file,
          previewImage: URL.createObjectURL(file)
        });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "previewImage") {
          formDataToSend.append(key, value);
        }
      });
  
      const res = await fetch("/api/register", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (res.ok) {
        router.push("/login");
      }
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="Tel_no" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded" />
            
            <div className="flex flex-col items-center">
              {formData.previewImage && (
                <img src={formData.previewImage} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover mb-2" />
              )}
              <input type="file" name="imageProfile" onChange={handleFileChange} className="w-full p-2 border rounded" />
            </div>
            
            <input type="text" name="youtubeURL" placeholder="Youtube URL" onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="facebookURL" placeholder="Facebook URL" onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="instagramURL" placeholder="Instagram URL" onChange={handleChange} className="w-full p-2 border rounded" />
  
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
          </form>
          <p className="text-center text-sm mt-4">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
        </div>
      </div>
    );
}