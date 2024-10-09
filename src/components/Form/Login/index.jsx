import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { loginUser } from "../../../hooks/api/auth";
import "./Login.css";

export default function LoginForm({ setIsAuthenticated, setEmail }) {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleRegisterClicked() {
    navigate("/register");
  }

  const validateInputs = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    const email = emailRef.current.value && emailRef.current.value.trim();
    const password = passRef.current.value && passRef.current.value.trim();

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid.");
      isValid = false;
    }

    if (!password || password.length === 0) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    return isValid;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (!validateInputs()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await loginUser({ email, password });
      setEmail(email);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      setIsSubmitting(false);
      if (error.message.includes("email")) {
        setEmailError("Email is invalid.");
      } else if (error.message.includes("password")) {
        setPasswordError("Password is invalid.");
      } else {
        toast.error("Invalid email or password. Please try again.", {
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
          closeOnClick: true,
        });
        emailRef.current.value = "";
        passRef.current.value = "";
      }
    }
  };

  return (
    <form id="msform" onSubmit={handleRegisterSubmit}>
      <div className="input-group">
        <input ref={emailRef} type="text" name="email" placeholder="Email" />
        {emailError && <span className="error-message">{emailError}</span>}
      </div>
      <div className="input-group">
        <input
          ref={passRef}
          type="password"
          name="pass"
          placeholder="Password"
        />
        {passwordError && (
          <span className="error-message">{passwordError}</span>
        )}
      </div>
      <div className="button-group">
        <button className="action-button" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <button
          className="action-button"
          type="button"
          onClick={handleRegisterClicked}
        >
          Register
        </button>
      </div>
    </form>
  );
}
