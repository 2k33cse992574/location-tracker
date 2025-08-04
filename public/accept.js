const serverURL = "https://location-tracker-1-le4f.onrender.com";

function acceptRequest() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get("id");

  if (!requestId) {
    document.getElementById("result").innerText = "❌ Missing request ID in URL.";
    return;
  }

  // Accept the request
  fetch(`${serverURL}/api/location/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Request accepted") {
        document.getElementById("result").innerText = "✅ Request accepted. Sharing location...";

        // Start sharing live location continuously
        navigator.geolocation.watchPosition(
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
            console.error("Location error:", err.message);
            document.getElementById("result").innerText = "❌ Location access denied.";
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
          }
        );
      } else {
        document.getElementById("result").innerText = "❌ Error accepting request.";
      }
    })
    .catch((err) => {
      console.error("Error accepting request:", err.message);
      document.getElementById("result").innerText = "❌ Server error.";
    });
}
