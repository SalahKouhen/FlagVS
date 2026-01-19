let currentPair = null;

fetch("https://flag-vs-api.salahkouhen.workers.dev/pair")
  .then(res => res.json())
  .then(data => {
    currentPair = data;

    document.getElementById("left-flag").textContent =
      data.flagA.name;

    document.getElementById("right-flag").textContent =
      data.flagB.name;
  });

document.getElementById("left-flag").onclick = () => {
  submitVote("A");
};

document.getElementById("right-flag").onclick = () => {
  submitVote("B");
};

let locked = false;

function submitVote(choice) {
  if (locked) return;
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

function showResults(results) {
  const leftPercent = results.percentA;
  const rightPercent = results.percentB;

  document.getElementById("left-fill").style.width =
    leftPercent + "%";
  document.getElementById("right-fill").style.width =
    rightPercent + "%";

  setTimeout(() => {
    loadNextPair();
  }, 1200);
}
