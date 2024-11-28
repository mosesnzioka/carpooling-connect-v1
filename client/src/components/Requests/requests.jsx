import React, { useState, useEffect } from "react";
import { toast } from "sonner"
import "./driverRequets.css";

function DriverRequests() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:4000/notifications/user", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        res.status(500).JSON({message: "error.. please try again"});
      }
    };

    fetchNotifications();
  }, []);

  const handleResponse = async (notificationId, status) => {
    try {
      const response = await fetch("http://localhost:4000/notifications/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId, status }),
      });

      if (response.ok) {
        toast.success(`Request ${status} successfully!`);
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, status } : notif
          )
        );
      } else {
        throw new Error("Failed to update notification status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({message:"An error occurred while updating the status."});
    }
  };

  return (
    <div className="requests-page">
      <h1>Passenger Requests</h1>
      <div className="requests-container">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif.id} className="request-card">
              <p><strong>From:</strong> {notif.sender.firstname} {notif.sender.lastname}</p>
              <p><strong>Message:</strong> {notif.message}</p>
              <p><strong>Pool:</strong> {notif.pool.location} to {notif.pool.destination}</p>
              <p><strong>Status:</strong> {notif.status}</p>
              {notif.status === "pending" && (
                <div>
                  <button
                    className="accept-btn"
                    onClick={() => handleResponse(notif.id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleResponse(notif.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No requests at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default DriverRequests;
