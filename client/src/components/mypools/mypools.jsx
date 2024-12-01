import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import "./myPools.css";

function MyPools() {
  const [pools, setPools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPool, setSelectedPool] = useState(null); // For updating

  const [updateData, setUpdateData] = useState({
    location: "",
    day: "",
    destination: "",
    carType: "",
    seatsAvailable: "",
    cost: "",
  });

  useEffect(() => {
    const fetchPools = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:4000/pool/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch pools.");
        }

        const data = await response.json();
        setPools(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPools();
  }, []);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:4000/pool/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete pool.");
      }

      // Update UI after deletion
      setPools(pools.filter((pool) => pool.id !== id));
      toast.success("Pool deleted successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (pool) => {
    setSelectedPool(pool);
    setUpdateData({
      location: pool.location || "",
      day: pool.day || "",
      destination: pool.destination || "",
      carType: pool.carType || "",
      seatsAvailable: pool.seatsAvailable || "",
      cost: pool.cost || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedPool) return;

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:4000/pool/${selectedPool.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update pool.");
      }

      // Update the pool list with the new data
      const updatedPool = await response.json();
      setPools((prevPools) =>
        prevPools.map((pool) => (pool.id === updatedPool.id ? updatedPool : pool))
      );

      toast.success("Pool updated successfully!");
      setSelectedPool(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="my-pools-loading">Loading your pools...</div>;
  }

  if (error) {
    return <div className="my-pools-error">{error}</div>;
  }

  if (pools.length === 0) {
    return <div className="my-pools-empty">You haven't created any pools yet.</div>;
  }

  return (
    <div className="my-pools-container">
  <h1 className="my-pools-header">My Pools</h1>
  <ul className="my-pools-list">
    {pools.map((pool) => (
      <li key={pool.id} className="my-pool-item">
        <p className="pool-info"><strong>Location:</strong> {pool.location}</p>
        <p className="pool-info"><strong>Day:</strong> {pool.day}</p>
        <p className="pool-info"><strong>Destination:</strong> {pool.destination}</p>
        <p className="pool-info"><strong>Car Type:</strong> {pool.carType}</p>
        <p className="pool-info"><strong>Seats Available:</strong> {pool.seatsAvailable}</p>
        <p className="pool-info"><strong>Cost:</strong> {pool.cost}</p>
        <p className="pool-info"><strong>Created At:</strong> {new Date(pool.createdAt).toLocaleString()}</p>
        <div className="pool-actions">
          <button className="pool-edit-button" onClick={() => handleEdit(pool)}>Edit</button>
          <button className="pool-delete-button" onClick={() => handleDelete(pool.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>

  {selectedPool && (
    <form className="update-pool-form" onSubmit={handleUpdateSubmit}>
      <h2 className="update-pool-header">Update Pool</h2>
      <label className="form-label">
        Location:
        <input
          type="text"
          className="form-input"
          value={updatedPool.location}
          onChange={(e) => setUpdatedPool({ ...updatedPool, location: e.target.value })}
        />
      </label>
      <label className="form-label">
        Day:
        <input
          type="text"
          className="form-input"
          value={updatedPool.day}
          onChange={(e) => setUpdatedPool({ ...updatedPool, day: e.target.value })}
        />
      </label>
      <label className="form-label">
        Destination:
        <input
          type="text"
          className="form-input"
          value={updatedPool.destination}
          onChange={(e) => setUpdatedPool({ ...updatedPool, destination: e.target.value })}
        />
      </label>
      <label className="form-label">
        Car Type:
        <input
          type="text"
          className="form-input"
          value={updatedPool.carType}
          onChange={(e) => setUpdatedPool({ ...updatedPool, carType: e.target.value })}
        />
      </label>
      <label className="form-label">
        Seats Available:
        <input
          type="number"
          className="form-input"
          value={updatedPool.seatsAvailable}
          onChange={(e) => setUpdatedPool({ ...updatedPool, seatsAvailable: e.target.value })}
        />
      </label>
      <label className="form-label">
        Cost:
        <input
          type="number"
          className="form-input"
          value={updatedPool.cost}
          onChange={(e) => setUpdatedPool({ ...updatedPool, cost: e.target.value })}
        />
      </label>
      <div className="form-actions">
        <button type="submit" className="form-update-button">Update</button>
        <button type="button" className="form-cancel-button" onClick={() => setSelectedPool(null)}>Cancel</button>
      </div>
    </form>
  )}
</div>

  );
}

export default MyPools;
