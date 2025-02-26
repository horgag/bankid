"use client"; // Mark this as a Client Component

import { createLink } from "../utils/deepLinkHelper";

export default function DeepLinkButton() {
  const handleClick = () => {
    // Get the user agent from the browser
    const userAgent = navigator.userAgent;

    // Example token and location (replace with actual values)
    const token = "your-autostart-token";
    const location = window.location.href;

    // Generate the deep link URL
    const deepLinkUrl = createLink(userAgent, token, location);

    // Redirect the user
    window.location.href = deepLinkUrl;
  };

  return (
    <div>
      {/* Display "VERSION 1" as a separate element */}
      <div
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        VERSION 1
      </div>

      {/* Button to open the mobile app */}
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