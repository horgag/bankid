self.addEventListener("message", (event) => {
  if (event.data === "start") {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";
    const intervalTime = 5000; // Poll every 5 seconds

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        self.postMessage(data); // Send data back to the main thread
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Start polling
    fetchData(); // Fetch immediately
    setInterval(fetchData, intervalTime); // Fetch at regular intervals
  }
});
