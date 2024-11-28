import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "sonner";
import "./signIn.css";
import useUserStore from "../store/userstore";

function SignInUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (userObj) => {
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "An error occurred");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (user) => {
      console.log(user);
      setUser(user);
      setEmail("");
      setPassword("");
      toast.success("Logedin successful!");
      navigate("/pools");
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="loginform">
        <div className="log_in">
          <label className="input">
            Email:
            <input
              type="text"
              placeholder="Enter email or username"
              value={email}
              className="form-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input">
            Password:
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="login_button" type="submit" disabled={isLoading}>
            {isLoading ? "Please wait..." : "Sign in"}
          </button>
          <h3 className="guide-to-register">Don't have an account?</h3>
          <a className="direct-to-signup" href="signup">
            Click here to register
          </a>
        </div>
      </div>
    </form>
  );
}

export default SignInUser;
