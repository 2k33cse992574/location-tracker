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
        document.getElementById("result").innerText =
          "✅ Request accepted. Requesting location permission...";
        startSharingLocation(requestId); // Directly start sharing
      } else {
        document.getElementById("result").innerText =
          "❌ Error accepting request.";
      }
    })
    .catch((err) => {
      console.error("Error:", err.message);
      document.getElementById("result").innerText = "❌ Server error.";
    });
}

function startSharingLocation(requestId) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      sendLocation(position.coords.latitude, position.coords.longitude, requestId);
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            sendLocation(position.coords.latitude, position.coords.longitude, requestId);
          },
          (err) => {
            console.error("Repeated location error:", err.message);
            document.getElementById("result").innerText =
              "❌ Failed to fetch live location.";
          }
        );
      }, 5000);
    },
    (error) => {
      console.error("Location error:", error.message);
      document.getElementById("result").innerText =
        "❌ Location access denied or unavailable.";
    }
  );
}

function sendLocation(latitude, longitude, requestId) {
  fetch(`${serverURL}/api/location/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId, latitude, longitude }),
  }).catch((err) => {
    console.error("Error sending location:", err.message);
  });
}
