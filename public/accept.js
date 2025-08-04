const serverURL = "https://location-tracker-1-le4f.onrender.com"; // Replace with your deployed URL

function acceptRequest() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get("id");

  if (!requestId) {
    document.getElementById("result").innerText = "❌ Missing request ID in URL.";
    return;
  }

  fetch(`${serverURL}/api/location/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        document.getElementById("result").innerText = "✅ Request Accepted. Sharing location...";

        // Start sending location every 5 seconds
        setInterval(() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              fetch(`${serverURL}/api/location/update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  requestId, // ✅ Now using requestId only
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }),
              });
            },
            (error) => {
              console.error("Location error:", error.message);
              document.getElementById("result").innerText = "❌ Location access denied.";
            }
          );
        }, 5000);
      } else {
        document.getElementById("result").innerText = data.error || "❌ Something went wrong.";
      }
    })
    .catch((err) => {
      console.error("Accept request failed:", err.message);
      document.getElementById("result").innerText = "❌ Server error.";
    });
}
