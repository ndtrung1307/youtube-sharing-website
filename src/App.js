import { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { checkTokenExpiry, clearUserAuthentication } from "./common/utils.js";
import Notifications from "./components/Notification/index.jsx";
import HomePage from "./pages/Homepage.jsx";
import Register from "./pages/Register/index.jsx";
import ShareVideo from "./pages/ShareVideo/index.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const isTokenExpired = checkTokenExpiry();

  if (!token || isTokenExpired) {
    clearUserAuthentication();
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const [notifications, setNotifications] = useState([]);

  return (
    <Router>
      <div className="App">
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={<HomePage setNotifications={setNotifications} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/share"
            element={
              <PrivateRoute>
                <ShareVideo />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
