import { useState, useEffect } from "react";

import { storage } from "../firebaseClient";

const useStorage = (file, bookName) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(0);
  const [url, setUrl] = useState(0);

  useEffect(() => {
    const storageRef = storage.ref(bookName + "/" + file.name);

    storageRef.put(file).on(
      "state_changed",
      (snapshot) => {
        let procenat = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(procenat);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      }
    );
  }, [file, bookName]);

  return { progress, url, error };
};

export default useStorage;
