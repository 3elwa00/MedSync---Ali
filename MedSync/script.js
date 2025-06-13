// script.js

import { db } from "./firebase-config.js";

function submitSummary() {
  const subject = document.getElementById("subject-select").value;
  const summary = document.getElementById("summary-input").value.trim();
  if (summary === "") return;

  db.collection("summaries").add({
    subject: subject,
    summary: summary,
    timestamp: new Date()
  }).then(() => {
    document.getElementById("summary-input").value = "";
    loadSummaries();
  }).catch(err => {
    console.error("Error adding summary:", err);
  });
}

function loadSummaries() {
  const subject = document.getElementById("subject-select").value;
  const summaryList = document.getElementById("summary-list");
  summaryList.innerHTML = "";

  console.log("Loading summaries for subject:", subject);

  db.collection("summaries")
    .where("subject", "==", subject)
    .orderBy("timestamp", "desc")
    .limit(10)
    .get()
    .then(snapshot => {
      console.log("Found", snapshot.size, "summaries");

      if (snapshot.empty) {
        const li = document.createElement("li");
        li.textContent = "No summaries yet.";
        summaryList.appendChild(li);
      } else {
        snapshot.forEach(doc => {
          console.log("Doc:", doc.data());
          const li = document.createElement("li");
          li.textContent = doc.data().summary;
          summaryList.appendChild(li);
        });
      }
    }).catch(err => {
      console.error("Error loading summaries:", err);
    });
}

document.getElementById("subject-select").addEventListener("change", loadSummaries);
window.onload = loadSummaries;
