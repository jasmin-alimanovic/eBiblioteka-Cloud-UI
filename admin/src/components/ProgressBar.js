import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";

export const ProgressBar = ({ photo, setPhoto, name, setUrl }) => {
  const { url, progress } = useStorage(photo, name);

  useEffect(() => {
    if (url) {
      setPhoto(null);
      setUrl(url);
    }
  }, [url, setPhoto, setUrl]);
  return (
    <div
      className="progress-bar mb-2"
      style={{ width: `${progress.toFixed(0)}%`, borderRadius: "20px" }}
    >
      {progress.toFixed(0)}%
    </div>
  );
};
