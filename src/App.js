import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { checkTokenExpiry } from "./common/utils.js";
import Notifications from "./components/Notification/index.jsx";
import { useSocket } from "./hooks/useSocket.js";
import HomePage from "./pages/Homepage.jsx";
import Register from "./pages/Register/index.jsx";
import ShareVideo from "./pages/ShareVideo/index.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const isTokenExpired = checkTokenExpiry();

  if (!token || isTokenExpired) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiryTime");
    localStorage.removeItem("userEmail");
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const socket = useSocket();

  const [videos, setVideos] = useState([]);

  const eventListener = (data) => {
    const userEmail = localStorage.getItem("userEmail");
    if (data.sharedBy === userEmail) {
      return;
    }
    setVideos((prev) => [...prev, data]);
  };

  useEffect(() => {
    if (socket) {
      socket.on("newVideo", eventListener);
      return () => socket.off("newVideo", eventListener);
    }
  });

  return (
    <Router>
      <div className="App">
        <Notifications notifications={videos} setNotifications={setVideos} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/share"
            element={
              <PrivateRoute>
                <ShareVideo />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
