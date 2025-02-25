// components/DeepLinkButton.tsx
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
  );
}
