import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { isStrongPassword, isValidEmail } from "../../common/utils";
import { registerUser } from "../../hooks/api/auth";
import "./Register.css";

function Register() {
  const emailRef = useRef();
  const passRef = useRef();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    const email = emailRef.current.value && emailRef.current.value.trim();
    const password = passRef.current.value && passRef.current.value.trim();

    if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    if (!isStrongPassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await registerUser({ email, password });

      if (response.status !== 201) {
        toast.error("Failed to register user. Please try again.", {
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
          closeOnClick: true,
        });
        setIsSubmitting(false);
        return;
      }
      navigate("/");
    } catch (error) {
      setIsSubmitting(false);
      if (error.message.includes("email")) {
        setEmailError(error.message);
      } else {
        setPasswordError(error.message);
      }
    }
  };

  return (
    <div className="register-page">
      <div>
        <form id="register-form" onSubmit={handleRegister}>
          <h2 class="fs-title">Register new user</h2>
          <div className="input-group">
            <input
              ref={emailRef}
              type="text"
              name="email"
              placeholder="Email"
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>
          <div className="input-group">
            <input
              ref={passRef}
              type="password"
              name="password"
              placeholder="Password"
            />
            {passwordError && (
              <span className="error-message">{passwordError}</span>
            )}
          </div>
          <button
            type="submit"
            className="action-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        <div class="dme_link">
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
