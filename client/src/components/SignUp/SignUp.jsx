import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import "./SignUp.css";

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newUser) => {
      const response = await fetch(`http://localhost:4000/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register user");
      }

      return await response.json();
    },
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: (data) => {
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("User registered successfully!");
      navigate("/signin");
    },
  });

  function handleRegisterUser(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const signupUser = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    mutate(signupUser);
  }

  return (
    <form className="signup-form" onSubmit={handleRegisterUser}>
      <div className="signup-section">
        <h2>CREATE ACCOUNT</h2>
        <div>
          <label htmlFor="firstName" className="signup-label">
            First Name:
            <input
              id="firstName"
              className="signup-input"
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="lastName" className="signup-label">
            Last Name:
            <input
              id="lastName"
              className="signup-input"
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="username" className="signup-label">
            Username:
            <input
              id="username"
              className="signup-input"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email" className="signup-label">
            Email:
            <input
              id="email"
              className="signup-input"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password" className="signup-label">
            Password:
            <input
              id="password"
              className="signup-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="signup-label">
            Confirm Password:
            <input
              id="confirmPassword"
              className="signup-input"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        <button className="signup-button" type="submit" disabled={isLoading}>
          {isLoading ? "Loading, please wait..." : "Submit"}
        </button>

        <h3>
          Already have an account? <Link to="/signin">Sign In</Link>
        </h3>
      </div>
    </form>
  );
}

export default SignupForm;
