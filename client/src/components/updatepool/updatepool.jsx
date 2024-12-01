import React, { useState } from "react";
import "./editPool.css";

function EditPool({ pool, onUpdate, onCancel }) {
  const [updatedPool, setUpdatedPool] = useState({
    location: pool.location || "",
    day: pool.day || "",
    destination: pool.destination || "",
    carType: pool.carType || "",
    seatsAvailable: pool.seatsAvailable || "",
    cost: pool.cost || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPool((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/pool/${pool.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPool),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update pool.");
      }

      const data = await response.json();
      onUpdate(data); // Update the pool in the parent state
    } catch (error) {
      console.error("Error updating pool:", error);
      alert(error.message);
    }
  };

  return (
    <form className="edit-pool-form" onSubmit={handleSubmit}>
      <h2 className="edit-pool-header">Edit Pool</h2>

      <label className="form-label">
        Location:
        <input
          type="text"
          name="location"
          value={updatedPool.location}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Day:
        <input
          type="text"
          name="day"
          value={updatedPool.day}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Destination:
        <input
          type="text"
          name="destination"
          value={updatedPool.destination}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Car Type:
        <input
          type="text"
          name="carType"
          value={updatedPool.carType}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Seats Available:
        <input
          type="number"
          name="seatsAvailable"
          value={updatedPool.seatsAvailable}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Cost:
        <input
          type="number"
          name="cost"
          value={updatedPool.cost}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="form-save-button">
          Save Changes
        </button>
        <button type="button" className="form-cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditPool;
