const serverURL = "https://location-tracker-1-le4f.onrender.com"; 

let lastLink = "";

function sendRequest() {
  const sender = document.getElementById("sender").value.trim();
  const receiver = document.getElementById("receiver").value.trim();

  if (!sender || !receiver) {
    alert("Please enter both sender and receiver!");
    return;
  }

  fetch(`${serverURL}/api/location/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender, receiver }),
  })
    .then(res => res.json())
    .then(data => {
      lastLink = `${serverURL}/accept.html?id=${data.link}`;
      document.getElementById("result").innerHTML = `
        ✅ Request sent!<br>
        <a href="${lastLink}" target="_blank">${lastLink}</a>
      `;
    })
    .catch(err => {
      console.error("Send request failed:", err.message);
      document.getElementById("result").innerText = "❌ Failed to send request.";
    });
}

function generateLink() {
  if (!lastLink) {
    alert("Send a request first.");
    return;
  }
  prompt("Copy this link:", lastLink);
}

function sendViaWhatsApp() {
  if (!lastLink) {
    alert("Send a request first.");
    return;
  }
  const message = `Hey! Please accept my location tracking request here: ${lastLink}`;
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
}
