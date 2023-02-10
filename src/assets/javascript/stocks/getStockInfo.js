const base = "https://api.polygon.io/v2/aggs/ticker";
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

const format = (d) => new Date(d).toLocaleDateString("en-CA");

export function getURL(t, index) {
  const key = index > 4 ? 1 : 0;
  let d = new Date();
  const today = format(d);
  const y = format(new Date(d.setDate(d.getDate() - 1)));
  return `${base}/${t}/range/1/hour/${y}/${today}?apiKey=${keys[key]}&sort=desc`;
}
