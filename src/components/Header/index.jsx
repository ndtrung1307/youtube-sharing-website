import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkTokenExpiry } from "../../common/utils";
import LoginForm from "../Form/Login";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (checkTokenExpiry()) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiryTime");
      localStorage.removeItem("userEmail");
      setUserEmail("");
      setIsAuthenticated(false);
    } else {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("userEmail");
      setUserEmail(email);
      setIsAuthenticated(!!token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleLogoClicked = () => {
    navigate("/");
  };

  return (
    <>
      <div className="homepage-header">
        <div className="header-left">
          <img
            src="logo.png"
            alt="website logo"
            className="logo"
            onClick={handleLogoClicked}
          />
        </div>
        {!isAuthenticated && (
          <LoginForm
            setIsAuthenticated={setIsAuthenticated}
            setEmail={setUserEmail}
          />
        )}
        {isAuthenticated && (
          <div className="header-right">
            <p>Welcome {userEmail}</p>
            <button
              onClick={() => navigate("/share")}
              className="button action-button"
            >
              Share a movie
            </button>
            <button onClick={handleLogout} className="button yellow-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
