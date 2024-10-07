import { useFetch } from "./useFetch";

export async function registerUser({ email, password }) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/v1.0/auth/register`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const resData = await response.json();

  if (!response.created) {
    throw new Error(resData.message || "Failed to register user");
  }

  return resData;
}
export const useRegisterUser = () => useFetch(registerUser, []);

export async function loginUser({ email, password }) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/v1.0/auth/login`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const resData = await response.json();

  console.log("LOGIN", response);

  if (!response.ok) {
    throw new Error(resData.message || "Failed to login user");
  }

  return { status: response.status, data: resData };
}

export const useLoginUser = () => useFetch(loginUser, []);
