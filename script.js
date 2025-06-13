// script.js

// db is initialized in firebase-config.js and available as window.db
// Ensure firebase-config.js is loaded before this script.

function submitSummary() {
  const subject = document.getElementById("subject-select").value;
  const summaryText = document.getElementById("summary-input").value;

  if (!summaryText.trim()) return;

  window.db.collection("summaries").add({
    subject: subject,
    text: summaryText,
    timestamp: new Date()
  }).then(() => {
    alert("Summary added!");
    document.getElementById("summary-input").value = "";
  });
}

function loadSummaries() {
  const subject = document.getElementById("subject-select").value;
  const list = document.getElementById("summary-list");
  list.innerHTML = "";

  window.db.collection("summaries")
    .where("subject", "==", subject)
    .orderBy("timestamp", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().text;
        list.appendChild(li);
      });
    });
}

// Auto-run on summaries page
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("summary-list")) {
    document.getElementById("subject-select").addEventListener("change", loadSummaries);
    loadSummaries(); // Initial load
  }
});
