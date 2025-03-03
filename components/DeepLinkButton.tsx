"use client"; // Mark this as a Client Component

import { useEffect, useRef } from "react"; // Import React hooks
import { createLink } from "../utils/deepLinkHelper";

export default function DeepLinkButton() {
  // Explicitly type pollingInterval as a reference to a number
  const pollingInterval = useRef<number | null>(null);

  // Function to start polling
  const startPolling = () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts/1"; // Example public API
    const intervalTime = 5000; // Poll every 5 seconds

    console.log("Starting polling...");

    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data received:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Start polling
    fetchData(); // Fetch immediately
    pollingInterval.current = window.setInterval(fetchData, intervalTime); // Use window.setInterval
  };

  // Function to stop polling
  const stopPolling = () => {
    console.log("Stopping polling...");
    if (pollingInterval.current !== null) {
      window.clearInterval(pollingInterval.current); // Use window.clearInterval
      pollingInterval.current = null; // Reset the interval ID
    }
  };

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startPolling(); // Start polling when the tab is visible
      } else {
        stopPolling(); // Stop polling when the tab is hidden
      }
    };

    // Add visibility change listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start polling when the component mounts
    startPolling();

    // Cleanup function
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopPolling(); // Stop polling when the component unmounts
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

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