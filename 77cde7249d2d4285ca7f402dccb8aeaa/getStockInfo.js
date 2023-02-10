const base = "https://api.polygon.io/v2/aggs/ticker";
const start = "2020-04-07";
const keys = [
  "FmqUDRp9RlOhOhe1mm1_pppFCgHAOtyr",
  "kQtHhouMI31SX5_MSclpodQXbN_LDGxi",
];
let globalDifference = 0;

function processSymbol(name, closingPrice) {
  let difference = 0;
  let totalShares = 0;
  for (let buyingRound in allPurchases) {
    const stockPurchase = allPurchases[buyingRound][name];
    if (stockPurchase) {
      const { shares, basis } = stockPurchase;
      totalShares += shares;
      const worthThen = shares * basis;
      const worthNow = shares * closingPrice;
      difference += worthNow - worthThen;
    }
  }
  globalDifference += difference;
  console.log(globalDifference);
  const status = difference < 0 ? "loss" : "gain";
  const markup = `<div class="card"><div class="title">${name.toUpperCase()}<span class="shares">${totalShares} s</span></div><div class="result ${status}" id="${name}">${difference.toFixed(
    1
  )}$</div></div>`;
  return markup;
}

function getURL(t, index) {
  const key = index > 4 ? 1 : 0;
  return `${base}/${t}/range/1/day/${start}/${Date.now()}?apiKey=${keys[key]}`;
}

const obj = Promise.all(
  Object.keys(allPurchases.first)
    .map((k) => k.toUpperCase())
    .map(function (ticker, i) {
      return new Promise((res, rej) => {
        return d3.json(getURL(ticker, i), (err, data) =>
          res({ name: ticker, data })
        );
      });
    })
).then(function (d) {
  d.forEach((investment) => {
    const { name, data } = investment;
    const closingPrice = data.results
      ? data.results[data.results.length - 1].c
      : 0;
    $("#readout").append(processSymbol(name.toLowerCase(), closingPrice));
  });
  $("#global").text(globalDifference.toFixed(1));
});
