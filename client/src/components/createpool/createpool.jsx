import React, { useState } from "react";
import { useMutation } from "react-query";
import "./createpool.css";

function CreatePoolForm() {
  const [formData, setFormData] = useState({
    location: "",
    day: "",
    destination: "",
    cost: "",
    departureTime: "",
    carType: "",
    seatsAvailable: "",
    peakPoint: "",
  });

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (pool) => {
      const response = await fetch(`http://localhost:4000/pool`, {
        method: "POST",
        body: JSON.stringify(pool),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create pool. Please try again.");
      }
      return response.json();
    },
    onSuccess: () => {
      alert("Pool created successfully!");
      setFormData({
        location: "",
        day: "",
        destination: "",
        cost: "",
        departureTime: "",
        carType: "",
        seatsAvailable: "",
        peakPoint: "",
      });
    },
    onError: () => {
      alert("Error occurred while creating pool. Please try again.");
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const updatedFormData = {
      ...formData,
      departureTime: new Date(`1970-01-01T${formData.departureTime}:00Z`).toISOString(),
    };

    mutate(updatedFormData);
  };

  return (
    <div className="create-pool-container">
      <h2>Create a Pool</h2>
      <form onSubmit={handleSubmit} className="create-pool-form">
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Day:</label>
          <input
            type="text"
            name="day"
            value={formData.day}
            onChange={handleInputChange}
            placeholder="Enter day created"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Enter destination"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Cost:</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleInputChange}
            placeholder="Enter cost for the trip"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Departure Time:</label>
          <input
            type="time"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Type of Car:</label>
          <input
            type="text"
            name="carType"
            value={formData.carType}
            onChange={handleInputChange}
            placeholder="Enter car type"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Seats Available:</label>
          <input
            type="number"
            name="seatsAvailable"
            value={formData.seatsAvailable}
            onChange={handleInputChange}
            placeholder="Enter number of seats available"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Peak Point:</label>
          <input
            type="text"
            name="peakPoint"
            value={formData.peakPoint}
            onChange={handleInputChange}
            placeholder="Enter peak point"
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="create-pool-button" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Create Pool"}
        </button>
        {isError && <p className="error-message">{error.message}</p>}
      </form>
    </div>
  );
}

export default CreatePoolForm;
