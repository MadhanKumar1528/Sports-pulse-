const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    sport: document.getElementById("sport").value
  };

  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    message.textContent = result.message;
    message.style.color = "green";
    form.reset();
  } catch (err) {
    message.textContent = "Error: Could not connect to server";
    message.style.color = "red";
  }
});
