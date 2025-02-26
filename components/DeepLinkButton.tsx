"use client"; // Mark this as a Client Component

import { createLink } from "../utils/deepLinkHelper";

export default function DeepLinkButton() {
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
        VERSION 1
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
