import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./allpools.css";

function Allpools() {
  const [pools, setPools] = useState([]);
  const navigate = useNavigate();

  // Fetch pools from the server
  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await fetch("http://localhost:4000/pools");
        if (!response.ok) {
          throw new Error("Failed to fetch pools");
        }
        const data = await response.json();
        setPools(data);
      } catch (error) {
        console.error("Error fetching pools:", error);
      }
    };
    fetchPools();
  }, []);

  const handleViewPool = (poolId) => {
    navigate(`/pools/${poolId}`);
  };

  return (
    <div className="pools-page">
      <h1>Available Pools</h1>
      <div className="pools-container">
        {pools.length > 0 ? (
          pools.map((pool) => (
            <div key={pool.id} className="pool-card">
              <h2>{pool.location}</h2>
              <p>
                <strong>Distance:</strong> {pool.distance} km
              </p>
              <p>
                <strong>Cost:</strong> ${pool.cost}
              </p>
              <p>
                <strong>Departure Time:</strong> {pool.departureTime}
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
          <p>No pools available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default Allpools;
