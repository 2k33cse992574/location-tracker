const serverURL = "https://location-tracker-1-le4f.onrender.com"; 
let map, marker;

function startTracking() {
  const requestId = document.getElementById("requestIdInput").value.trim();
  if (!requestId) {
    alert("Please enter a request ID.");
    return;
  }

  setInterval(() => {
    fetch(`${serverURL}/api/location/${requestId}`)
      .then(res => res.json())
      .then(data => {
        if (!data || !data.latitude || !data.longitude) {
          document.getElementById("output").innerText = "Waiting for location update...";
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
  if (!map) {
    map = L.map('map').setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    marker = L.marker([lat, lng]).addTo(map);
  } else {
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng]);
  }
}
