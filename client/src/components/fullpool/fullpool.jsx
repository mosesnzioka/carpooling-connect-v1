import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import "./fullpool.css";

function Fullpool() {
  const { id } = useParams();
  console.log("Pool ID:", id);

  const { data, error, isError, isLoading } = useQuery(
    `pool-${id}`,
    async () => {
      const response = await fetch(`http://localhost:4000/pool/${id}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Failed to fetch the pool data");
      }

      return response.json();
    },
  );

  if (isLoading) {
    return <h2>Loading... Please wait.</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  function formatDepartureTime(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  return (
    <div className="card">
      <div className="card-item">
        Location: <span className="value">{data.location}</span>
      </div>
      <div className="card-item">
        Day: <span className="value">{data.day}</span>
      </div>
      <div className="card-item">
        Destination: <span className="value">{data.destination}</span>
      </div>
      <div className="card-item">
        Departure Time:{" "}
        <span className="value">{formatDepartureTime(data.departureTime)}</span>
      </div>
      <div className="card-item">
        Car Type: <span className="value">{data.carType}</span>
      </div>
      <div className="card-item">
        Seats Available: <span className="value">{data.seatsAvailable}</span>
      </div>
      <div className="card-item">
        Peak Point: <span className="value">{data.peakPoint}</span>
      </div>
      <div className="card-item">
        Cost: <span className="value">{data.cost}</span>
      </div>
    </div>
  );
}

export default Fullpool;
