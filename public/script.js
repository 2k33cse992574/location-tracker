const serverURL = "http://localhost:5000";
let sender = "user"; // You can update to real number or login in future

let receiver = "";

function sendRequest() {
  receiver = document.getElementById("receiver").value;

  fetch(`${serverURL}/api/location/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender, receiver }),
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText = data.message;

      const acceptURL = `${window.location.origin}/accept.html?sender=${sender}&receiver=${receiver}`;
      alert("Share this link to receiver via WhatsApp/SMS:\n\n" + acceptURL);
    });
}

let generatedLink = "";

function generateLink() {
  receiver = document.getElementById("receiver").value;
  generatedLink = `${window.location.origin}/accept.html?sender=${sender}&receiver=${receiver}`;
  document.getElementById("result").innerText = "🔗 Link: " + generatedLink;
}

function sendViaWhatsApp() {
  if (!generatedLink) generateLink();

  const message = `Hey! Accept my location tracking request:\n${generatedLink}`;
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
}
