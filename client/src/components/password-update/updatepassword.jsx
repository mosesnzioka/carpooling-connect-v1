import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for redirection
import "./updatePassword.css";

function UpdatePassword() {
  const [passwordInfo, setPasswordInfo] = useState({
    previousPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const navigate = useNavigate(); // Initialize the navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordInfo.previousPassword) {
      toast.error("Your previous password is wrong");
      return;
    }

    if (passwordInfo.newPassword !== passwordInfo.confirmNewPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          previousPassword: passwordInfo.previousPassword,
          newPassword: passwordInfo.newPassword,
        }),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Password updated successfully!");

        document.cookie = "authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC"; 

        navigate("/signin");

        setPasswordInfo({
          previousPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update password.");
      }
    } catch (error) {
      toast.error("An error occurred while updating your password.");
    }
  };

  return (
    <div className="update-password-container">
      <h1 className="update-password-header">Update Your Password</h1>
      <form onSubmit={handleSubmit} className="update-password-form">
        <div className="update-password-group">
          <label htmlFor="previousPassword" className="update-password-label">
            Previous Password
          </label>
          <input
            type="password"
            id="previousPassword"
            name="previousPassword"
            value={passwordInfo.previousPassword}
            onChange={handleChange}
            className="update-password-input"
            required
          />
        </div>
        <div className="update-password-group">
          <label htmlFor="newPassword" className="update-password-label">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordInfo.newPassword}
            onChange={handleChange}
            className="update-password-input"
            required
          />
        </div>
        <div className="update-password-group">
          <label htmlFor="confirmNewPassword" className="update-password-label">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={passwordInfo.confirmNewPassword}
            onChange={handleChange}
            className="update-password-input"
            required
          />
        </div>
        <button type="submit" className="update-password-btn">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
