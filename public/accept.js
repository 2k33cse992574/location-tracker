let locationInterval = null;

function acceptRequest() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get("id");

  if (!requestId) {
    document.getElementById("result").innerText = "❌ Missing request ID in URL.";
    return;
  }

  fetch(`/api/location/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === "Request accepted") {
        document.getElementById("result").innerText = "✅ Request accepted. Requesting location permission...";

        if ("geolocation" in navigator) {
          startSharingLocation(requestId);
        } else {
          document.getElementById("result").innerText = "❌ Geolocation is not supported by your browser.";
        }
      } else {
        document.getElementById("result").innerText = "❌ Error accepting request.";
      }
    })
    .catch(err => {
      console.error("Error:", err.message);
      document.getElementById("result").innerText = "❌ Server error.";
    });
}

function startSharingLocation(requestId) {
  navigator.geolocation.getCurrentPosition(
    position => {
      sendLocation(position.coords.latitude, position.coords.longitude, requestId);

      locationInterval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          pos => {
            sendLocation(pos.coords.latitude, pos.coords.longitude, requestId);
          },
          err => {
            console.error("Repeated location error:", err.message);
            document.getElementById("result").innerText = "❌ Failed to fetch live location.";
          }
        );
      }, 5000);

      document.getElementById("stopBtn").style.display = "inline-block";
    },
    error => {
      console.error("Location error:", error);
      let errMsg = "❌ Location access denied or unavailable.";
      if (window.isSecureContext === false) {
        errMsg = "❌ Geolocation requires HTTPS or localhost. If you are using an IP address (like 192.168.x.x), the browser will block location access.";
      } else if (error.code === 1) {
        errMsg = "❌ Permission denied. You must allow location access in your browser.";
      }
      document.getElementById("result").innerText = errMsg;
    }
  );
}

function sendLocation(latitude, longitude, requestId) {
  fetch(`/api/location/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId, latitude, longitude }),
  }).catch(err => {
    console.error("Error sending location:", err.message);
  });
}

function stopSharing() {
  if (locationInterval) {
    clearInterval(locationInterval);
    locationInterval = null;
    document.getElementById("result").innerText = "🛑 Location sharing stopped.";
    document.getElementById("stopBtn").style.display = "none";
  }
}
