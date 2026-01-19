fetch("https://flag-vs-api.salahkouhen.workers.dev/pair")
  .then(res => res.json())
  .then(data => {
    console.log("PAIR FROM API:", data);
  })
  .catch(err => {
    console.error("API ERROR:", err);
  });
