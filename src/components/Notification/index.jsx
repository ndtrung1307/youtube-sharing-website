import React from "react";
import "./Notification.css";

const Notifications = ({ notifications, setNotifications }) => {
  function handleNotificationClick(notification) {
    setNotifications((prevNotifications) => {
      return prevNotifications.filter((prevNotification) => {
        return prevNotification !== notification;
      });
    });
  }

  return (
    <div className="notifications">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="notification"
          onClick={() => handleNotificationClick(notification)}
        >
          New video shared: {notification.title} by {notification.sharedBy}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
