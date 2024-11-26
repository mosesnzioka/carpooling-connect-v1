import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./allpools.css";

function Allpools() {
  const [pools, setPools] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await fetch("http://localhost:4000/pools", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error("Failed to fetch pools");
        }
        const data = await response.json();
        setPools(data);
      } catch (error) {
        setError("Unable to load pools. Please try again later.");
      }
    };
    fetchPools();
  }, []);

  const handleViewPool = (poolId) => {
    navigate(`/pool/${poolId}`);
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="pools-page">
      <h1 className="pools-header">Available Pools</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="pools-container">
        {pools.length > 0 ? (
          pools.map((pool) => (
            <div key={pool.id} className="pool-card">
              <h2 className="pool-location">{pool.location}</h2>
              <p className="pool-info">
                <strong>Distance:</strong> {pool.distance} km
              </p>
              <p className="pool-info">
                <strong>Cost:</strong> ${pool.cost}
              </p>
              <p className="pool-info">
                <strong>Departure Time:</strong> {formatTime(pool.departureTime)}
              </p>
              <button
                className="view-button"
                onClick={() => handleViewPool(pool.id)}
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p className="no-pools">No pools available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default Allpools;
