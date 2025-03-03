"use client"; // Mark this as a Client Component

import { useEffect, useRef } from "react"; // Import React hooks
import { createLink } from "../utils/deepLinkHelper";

export default function DeepLinkButton() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Create a new Web Worker
    workerRef.current = new Worker(new URL("../worker.js", import.meta.url));

    // Listen for messages from the worker
    workerRef.current.addEventListener("message", (event) => {
      console.log("Data received:", event.data);
    });

    // Start the worker
    workerRef.current.postMessage("start");

    // Cleanup function
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate(); // Stop the worker when the component unmounts
      }
    };
  }, []);

  const handleClick = () => {
    const userAgent = navigator.userAgent;
    const token = "your-autostart-token"; // Replace with actual token
    const location = window.location.href;

    // Generate the deep link URL
    const deepLinkUrl = createLink(userAgent, token, location);

    // Redirect the user
    window.location.href = deepLinkUrl;
  };

  return (
    <div>
      <div
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        VERSION 2
      </div>

      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        Open Mobile App
      </button>
    </div>
  );
}