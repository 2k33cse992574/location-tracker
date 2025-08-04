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
      document.getElementById("result").innerText = "✅ Accepted. Sending location...";

      // Start sending location
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetch(`${serverURL}/api/location/update`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                requestId,
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
    })
    .catch((err) => {
      console.error("Accept request failed:", err.message);
      document.getElementById("result").innerText = "❌ Server error.";
    });
}

