import { checkTokenExpiry } from "../../common/utils";
import { useFetch } from "./useFetch";

const videosURl = `${process.env.REACT_APP_BACKEND_URL}/v1.0/videos`;

async function fetchVideos() {
  const response = await fetch(videosURl, {
    mode: "cors",
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }
  return resData.videos;
}

export const useFetchVideos = () => useFetch(fetchVideos, []);

export async function shareVideo({ videoUrl }) {
  if (checkTokenExpiry()) {
    throw new Error("Token has expired. Please log in again.");
  }

  const response = await fetch(videosURl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ videoUrl }),
  });

  const resData = await response.json();

  if (!response.ok || response.status !== 201) {
    throw new Error("Failed to share video. " + resData.message);
  }

  return { status: response.status, data: resData };
}
