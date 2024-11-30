import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import "./driverRequets.css";

function DriverRequests() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("http://localhost:4000/current_user", {
          credentials: "include",
        });
        if (response.ok) {
          const user = await response.json();
          setUserId(user.id);
        } else {
          throw new Error("Failed to fetch user ID");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/notifications/user",
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        toast.error("Error fetching notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleResponse = async (notificationId, status) => {
    try {
      const response = await fetch(
        "http://localhost:4000/notifications/status",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationId, status }),
        },
      );

      if (response.ok) {
        toast.success(`Request ${status} successfully!`);
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, status } : notif,
          ),
        );
      } else {
        throw new Error("Failed to update notification status");
      }
    } catch (error) {
      toast.error("An error occurred while updating the status.");
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/notifications/${notificationId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        toast.success("Notification deleted successfully!");
        setNotifications((prev) =>
          prev.filter((notif) => notif.id !== notificationId),
        );
      } else {
        throw new Error("Failed to delete notification");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the notification.");
    }
  };

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <div className="requests-page">
      <h1>Passenger Requests</h1>
      <div className="requests-container">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif.id} className="request-card">
              <p>
                <strong>From:</strong> {notif.sender?.firstname}{" "}
                {notif.sender?.lastname}
              </p>
              <p>
                <strong>To:</strong> {notif.receiver?.firstname}{" "}
                {notif.receiver?.lastname}
              </p>
              <p>
                <strong>Message:</strong> {notif.message}
              </p>
              <p>
                <strong>Pool:</strong> {notif.pool?.location} to{" "}
                {notif.pool?.destination}
              </p>
              <p>
                <strong>Status:</strong> {notif.status}
              </p>

              {notif.receiverId === userId ? (
                notif.status === "pending" ? (
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
                ) : (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(notif.id)}
                  >
                    Delete
                  </button>
                )
              ) : (
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(notif.id)}
                >
                  Delete
                </button>
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
