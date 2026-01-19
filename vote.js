let currentPair = null;
let locked = false;

// click handlers
document.getElementById("left-flag").onclick = () => handleClick("A");
document.getElementById("right-flag").onclick = () => handleClick("B");

function handleClick(choice) {
  if (!currentPair) return;

  if (locked) {
    // results are showing → load next matchup
    loadNextPair();
  } else {
    // voting phase
    submitVote(choice);
  }
}

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

// submit vote
function submitVote(choice) {
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

// show results and wait
function showResults(results) {
  document.getElementById("left-fill").style.width =
    results.percentA + "%";
  document.getElementById("right-fill").style.width =
    results.percentB + "%";
}

// initial load
loadNextPair();
