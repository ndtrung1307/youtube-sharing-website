import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { isValidYoutubeUrl } from "../../common/utils";
import Header from "../../components/Header";
import { shareVideo } from "../../hooks/api/video";
import "./ShareVideo.css";

function ShareVideo() {
  const videoUrlInput = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlError, setUrlError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const videoUrl = videoUrlInput.current.value.trim();

    if (!videoUrl) {
      setUrlError("URL is required.");
      return;
    }

    if (!isValidYoutubeUrl(videoUrl)) {
      setUrlError("Invalid YouTube URL format.");
      return;
    }

    try {
      setIsSubmitting(true);
      await shareVideo({ videoUrl });
      toast.success("Video shared successfully!", {
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
        closeOnClick: true,
      });
      navigate("/");
    } catch (error) {
      setIsSubmitting(false);
      setUrlError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="share-video-page">
        <h2>Share a Youtube movie</h2>
        <form onSubmit={handleSubmit} className="share-video-form">
          <div className="input-group">
            <label htmlFor="videoUrl">YouTube URL:</label>
            <input
              type="text"
              id="videoUrl"
              ref={videoUrlInput}
              placeholder="Enter YouTube URL"
            />
            {urlError && <span className="error-message">{urlError}</span>}
          </div>
          <button
            type="submit"
            className="action-button"
            disabled={isSubmitting}
          >
            Share
          </button>
        </form>
      </div>
    </>
  );
}

export default ShareVideo;
