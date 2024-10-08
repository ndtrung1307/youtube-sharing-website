import { useState } from "react";
import {
  extractYoutubeVideoId,
  formatTimeDifference,
} from "../../common/utils";
import Loader from "../loader";
import "./Listvideos.css";

const MAX_DESCRIPTION_LENGTH = 300;

function VideoItem({ video }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription =
    video.description.length > MAX_DESCRIPTION_LENGTH
      ? video.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
      : video.description;

  const videoId = extractYoutubeVideoId(video.videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const sharedTime = formatTimeDifference(video.createdAt);

  return (
    <div key={video.id} className="video-player">
      <iframe
        src={embedUrl}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="video-details">
        <h2 className="video-title">{video.title}</h2>
        <p className="shared-by">Shared by: {video.sharedBy}</p>
        <p className="shared-time">{sharedTime}</p>
        <h3>Description:</h3>
        <p className="description">
          {isExpanded ? video.description : truncatedDescription}
          {video.description.length > MAX_DESCRIPTION_LENGTH && (
            <span className="read-more" onClick={toggleDescription}>
              {isExpanded ? " Read less" : " Read more"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default function ListVideos({ videos, isFetching }) {
  if (isFetching) {
    return <Loader />;
  }
  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoItem video={video} />
      ))}
    </div>
  );
}
