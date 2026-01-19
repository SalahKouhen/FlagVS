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

function submitVote(choice) {
  fetch("https://flag-vs-api.salahkouhen.workers.dev/vote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      flagA: currentPair.flagA.code,
      flagB: currentPair.flagB.code,
      winner: choice
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Vote accepted:", data);
    });
}
