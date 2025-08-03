const serverURL = "http://localhost:5000";

function acceptRequest() {
  const urlParams = new URLSearchParams(window.location.search);
  const sender = urlParams.get("sender");
  const receiver = urlParams.get("receiver");

  fetch(`${serverURL}/api/location/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender, receiver }),
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText = data.message;

      setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          fetch(`${serverURL}/api/location/update`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sender,
              receiver,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          });
        });
      }, 5000);
    });
}
