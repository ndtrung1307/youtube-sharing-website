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
