const base = "https://api.polygon.io/v2/aggs/ticker";
const start = "2020-04-07";
const keys = [
  "FmqUDRp9RlOhOhe1mm1_pppFCgHAOtyr",
  "kQtHhouMI31SX5_MSclpodQXbN_LDGxi",
];
import { allPurchases } from "./original";

export function processSymbol(name, closingPrice) {
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
  return {
    name,
    status: difference < 0 ? "loss" : "gain",
    totalShares,
    difference,
  };
}

export function getURL(t, index) {
  const key = index > 4 ? 1 : 0;
  return `${base}/${t}/range/1/day/${start}/${Date.now()}?apiKey=${keys[key]}`;
}
