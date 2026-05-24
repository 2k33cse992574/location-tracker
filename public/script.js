let lastLink = "";

// Sender sends a location request
function sendRequest() {
  const sender = document.getElementById("sender").value.trim();
  const receiver = document.getElementById("receiver").value.trim();

  if (!sender || !receiver) return alert("Please enter both names.");

  fetch(`/api/location/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender, receiver }),
  })
    .then(res => res.json())
    .then(data => {
      lastLink = `${window.location.origin}/accept.html?id=${data.link}`;
      const trackLink = `/track.html?id=${data.link}`;
      document.getElementById("result").innerHTML = `
        ✅ Request sent!<br><br>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <a href="${lastLink}" target="_blank" style="word-break: break-all;">Share this link: ${lastLink}</a>
          <a href="${trackLink}" target="_blank" style="background:var(--accent); color:#fff; padding:10px; border-radius:8px; text-align:center; text-decoration:none;">🛰️ Track Location Here</a>
        </div>
      `;
    })
    .catch(err => {
      console.error("Send request failed:", err);
      document.getElementById("result").innerText = "❌ Failed to send request: " + err.message;
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
