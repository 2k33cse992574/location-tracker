const serverURL = "https://your-backend-domain.com/api/location"; // ✅ Change to your Render backend URL if hosted

async function sendRequest() {
  const sender = prompt("Enter your name or number:");
  const receiver = document.getElementById("receiver").value;

  if (!sender || !receiver) {
    alert("Please enter both sender and receiver.");
    return;
  }

  const response = await fetch(`${serverURL}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender, receiver }),
  });

  const data = await response.json();
  const link = `${window.location.origin}/accept.html?id=${data.link}`;
  document.getElementById("result").innerText = "Link: " + link;
  localStorage.setItem("lastRequestLink", link);
}

function generateLink() {
  const link = localStorage.getItem("lastRequestLink");
  if (link) {
    document.getElementById("result").innerText = "Link: " + link;
  } else {
    alert("No request found. Send one first.");
  }
}

function sendViaWhatsApp() {
  const link = localStorage.getItem("lastRequestLink");
  if (link) {
    const text = `Please accept my location request: ${link}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  } else {
    alert("Generate link first.");
  }
}
