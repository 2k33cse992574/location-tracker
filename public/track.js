let map, marker;

window.onload = () => {
  // Initialize map with a default global view
  map = L.map('map').setView([20, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (id) {
    document.getElementById("requestIdInput").value = id;
    startTracking();
  }
};

function startTracking() {
  const requestId = document.getElementById("requestIdInput").value.trim();
  if (!requestId) {
    alert("Please enter a request ID.");
    return;
  }

  setInterval(() => {
    fetch(`/api/location/${requestId}`)
      .then(res => res.json())
      .then(data => {
        if (!data || !data.latitude || !data.longitude) {
          const msg = data.message || "Waiting for location update...";
          document.getElementById("output").innerText = msg;
          return;
        }

        const { latitude, longitude } = data;

        document.getElementById("output").innerHTML = `
          <p><strong>Latitude:</strong> ${latitude}</p>
          <p><strong>Longitude:</strong> ${longitude}</p>
        `;

        updateMap(latitude, longitude);
      })
      .catch(err => {
        console.error("Error fetching location:", err);
        document.getElementById("output").innerText = "Error fetching location.";
      });
  }, 5000);
}

function updateMap(lat, lng) {
  if (!marker) {
    marker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 15);
  } else {
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng]);
  }
}
