const serverURL = "https://location-tracker-1-le4f.onrender.com";

function acceptRequest() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get("id");

  if (!requestId) {
    document.getElementById("result").innerText = "❌ Missing request ID in URL.";
    return;
  }

  // Accept location request
  fetch(`${serverURL}/api/location/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Request accepted") {
        document.getElementById("result").innerText = "✅ Request accepted. Requesting location access...";

        // Ask for location access and start sharing
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            () => {
              // Start location sharing every 5 seconds
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
                  (err) => {
                    console.error("Error getting location:", err.message);
                    document.getElementById("result").innerText = "❌ Location access denied.";
                  }
                );
              }, 5000);
            },
            (err) => {
              console.error("Permission error:", err.message);
              document.getElementById("result").innerText = "❌ Location permission denied.";
            }
          );
        } else {
          document.getElementById("result").innerText = "❌ Geolocation not supported.";
        }
      } else {
        document.getElementById("result").innerText = "❌ Error accepting request.";
      }
    })
    .catch((err) => {
      console.error("Server error:", err.message);
      document.getElementById("result").innerText = "❌ Server error.";
    });
}

