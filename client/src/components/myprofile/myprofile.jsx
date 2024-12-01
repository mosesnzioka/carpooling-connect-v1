import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import useUserStore from "../store/userstore";
import "./myprofile.css";

function PersonalInformation() {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
  });

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) return;
    setUserInfo({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
        credentials: "include",
      });

      if (response.ok) {
        const updatedUser = await response.json();
        useUserStore.setState({ user: updatedUser });
        toast.success("Profile updated successfully!");
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (error) {
      toast.error("An error occurred while updating your profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return <p className="update-profile-loading">Loading your profile...</p>;
  }

  return (
    <div className="update-profile-container">
      <h1 className="update-profile-header">Update Your Profile</h1>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="update-profile-group">
          <label htmlFor="firstname" className="update-profile-label">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={userInfo.firstname}
            onChange={handleChange}
            className="update-profile-input"
            required
          />
        </div>
        <div className="update-profile-group">
          <label htmlFor="lastname" className="update-profile-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={userInfo.lastname}
            onChange={handleChange}
            className="update-profile-input"
            required
          />
        </div>
        <div className="update-profile-group">
          <label htmlFor="email" className="update-profile-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="update-profile-input"
            required
          />
        </div>
        <div className="update-profile-group">
          <label htmlFor="username" className="update-profile-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            className="update-profile-input"
          />
        </div>
        <button type="submit" className="update-profile-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default PersonalInformation;




