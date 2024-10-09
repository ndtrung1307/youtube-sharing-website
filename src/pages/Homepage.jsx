import React from "react";
import Error from "../components/Error";
import Header from "../components/Header";
import ListVideos from "../components/ListVideos";
import { useFetchVideos } from "../hooks/api/video";
import "./Homepage.css";

function HomePage({ setNotifications }) {
  const {
    isFetching: isListVideoFetching,
    error,
    fetchedData: videos,
  } = useFetchVideos();

  return (
    <div className="homepage">
      <Header setNotifications={setNotifications} />
      {error && <Error title="An error occurred!" message={error.message} />}
      {!error && (
        <ListVideos videos={videos} isFetching={isListVideoFetching} />
      )}
    </div>
  );
}

export default HomePage;
