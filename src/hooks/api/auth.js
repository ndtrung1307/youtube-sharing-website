import { jwtDecode } from "jwt-decode";

const AUTH_URL = `${process.env.REACT_APP_BACKEND_URL}/v1.0/auth`;

async function authenticateUser(endpoint, { email, password }) {
  const response = await fetch(`${AUTH_URL}/${endpoint}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const resData = await response.json();

  if (!response.ok || response.status !== 201 || !resData.access_token) {
    throw new Error(resData.message || "Failed to authenticate user");
  }

  const { email: decodedEmail } = jwtDecode(resData.access_token);

  storeAuthenticationConfig(resData.access_token, decodedEmail);

  return { status: response.status, data: resData };
}

export async function registerUser(credentials) {
  return authenticateUser("register", credentials);
}

export async function loginUser(credentials) {
  return authenticateUser("login", credentials);
}

function storeAuthenticationConfig(token, email) {
  const tokenExpiryTime =
    Number(process.env.REACT_APP_TOKEN_EXPIRES_IN) || 59 * 60 * 1000;
  const tokenExpiryTimeAt = new Date().getTime() + tokenExpiryTime;

  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiryTime", tokenExpiryTimeAt);
  localStorage.setItem("userEmail", email);
}
