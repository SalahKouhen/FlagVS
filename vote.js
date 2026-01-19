let currentPair = null;
let locked = false;

// click handlers
document.getElementById("left-flag").onclick = () => {
  submitVote("A");
};

document.getElementById("right-flag").onclick = () => {
  submitVote("B");
};

// load a new matchup
function loadNextPair() {
  fetch("https://flag-vs-api.salahkouhen.workers.dev/pair")
    .then(res => res.json())
    .then(data => {
      currentPair = data;
      locked = false;

      document.getElementById("left-flag").textContent =
        data.flagA.name;
      document.getElementById("right-flag").textContent =
        data.flagB.name;

      // reset fills
      document.getElementById("left-fill").style.width = "50%";
      document.getElementById("right-fill").style.width = "50%";
    });
}

// submit a vote
function submitVote(choice) {
  if (locked || !currentPair) return;
  locked = true;

  fetch("https://flag-vs-api.salahkouhen.workers.dev/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      flagA: currentPair.flagA.code,
      flagB: currentPair.flagB.code,
      winner: choice
    })
  })
    .then(() =>
      fetch(
        `https://flag-vs-api.salahkouhen.workers.dev/results?flagA=${currentPair.flagA.code}&flagB=${currentPair.flagB.code}`
      )
    )
    .then(res => res.json())
    .then(showResults);
}

// animate results, then auto-next
function showResults(results) {
  document.getElementById("left-fill").style.width =
    results.percentA + "%";
  document.getElementById("right-fill").style.width =
    results.percentB + "%";

  setTimeout(loadNextPair, 1200);
}

// initial load
loadNextPair();
