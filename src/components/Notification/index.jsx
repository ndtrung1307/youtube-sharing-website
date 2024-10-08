import { useEffect } from "react";
import { Bounce, toast } from "react-toastify";
import "./Notification.css";

function MessageToast(notification) {
  return (
    <>
      <h3>🚀 {notification.notification.sharedBy} just shared a movie.</h3>
      <p>{notification.notification.title}</p>
    </>
  );
}

const Notifications = ({ notifications, setNotifications }) => {
  useEffect(() => {
    function handleNotificationClose(notification) {
      setNotifications((prevNotifications) => {
        return prevNotifications.filter((prevNotification) => {
          return prevNotification !== notification;
        });
      });
    }

    notifications.forEach((notification) => {
      toast(<MessageToast notification={notification} />, {
        onClose: () => handleNotificationClose(notification),
        autoClose: 10000,
        theme: "light",
        transition: Bounce,
        closeOnClick: true,
      });
    });
  }, [notifications, setNotifications]);

  return null;
};

export default Notifications;
