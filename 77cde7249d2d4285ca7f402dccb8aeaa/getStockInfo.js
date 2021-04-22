const base = "https://api.polygon.io/v2/aggs/ticker";
const start = "2020-04-07";
const keys = [
  "FmqUDRp9RlOhOhe1mm1_pppFCgHAOtyr",
  "kQtHhouMI31SX5_MSclpodQXbN_LDGxi",
];

function processSymbol(name, closingPrice) {
  const { shares, basis } = originals[name];
  const holdingsNow = closingPrice * shares;
  const difference = (holdingsNow - basis * shares).toFixed(1);
  const status = difference < 0 ? "loss" : "gain";
  const markup = `<div class="card"><div class="title">${name.toUpperCase()}</div><div class="result ${status}" id="${name}">${difference}$</div></div>`;
  return markup;
}

function getURL(t, index) {
  const key = index > 4 ? 1 : 0;
  return `${base}/${t}/range/1/day/${start}/${Date.now()}?apiKey=${keys[key]}`;
}

Promise.all(
  Object.keys(originals)
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
    console.log(investment);
    const { name, data } = investment;
    const closingPrice = data.results
      ? data.results[data.results.length - 1].c
      : 0;
    $("#readout").append(processSymbol(name.toLowerCase(), closingPrice));
  });
});
