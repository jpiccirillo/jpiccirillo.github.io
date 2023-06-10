<template>
  <section class="">
    <div class="card global panel" id="global">
      Global Difference:
      {{ globalDifference.toFixed(1) }}
    </div>

    <div class="readout" id="readout">
      <div class="card panel image" v-for="s in stocks" :key="s.name">
        <div class="title">
          {{ s.name.toUpperCase()
          }}<span class="shares">{{ s.totalShares }} s</span>
        </div>
        <div :class="`result ${s.status}`" :id="s.name">
          {{ s.difference.toFixed(1) }}$
        </div>
        <div class="small-print">
          <span>${{ s.closingPrice }}</span>
          <span class="breakEvenPrice">(${{ s.breakEvenPrice }})</span>
          <span>{{
            s.closingTime.toLocaleString([], {
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          }}</span>
        </div>
      </div>
    </div>
    <div id="chartContainer"></div>
  </section>
</template>

<script>
import { allPurchases } from "@/assets/javascript/stocks/original";
import {
  getURL,
  fetchLocalTickerPrice,
  processSymbol,
} from "@/assets/javascript/stocks/getStockInfo";

console.log(process.env.NODE_ENV);
export default {
  data() {
    return {
      stocks: [],
    };
  },
  computed: {
    globalDifference() {
      return this.stocks.reduce((a, i) => {
        a += i.difference;
        return a;
      }, 0);
    },
  },
  methods: {
    breakEvenPrice(purchaseHistory) {
      // Calculate the total cost of the shares currently held
      const totalCost = purchaseHistory.reduce((total, { shares, basis }) => {
        return total + shares * basis;
      }, 0);

      // Calculate the number of shares currently held
      const numShares = purchaseHistory.reduce((total, { shares }) => {
        return total + shares;
      }, 0);

      // Calculate the average cost per share for the currently held shares
      const avgCostPerShare = totalCost / numShares;

      // Calculate the break-even price
      const breakEvenPrice = (numShares * avgCostPerShare) / numShares;

      // Return the break-even price
      return breakEvenPrice.toFixed(2);
    },
  },
  mounted() {
    Promise.all(
      Object.keys(allPurchases.first)
        .map((k) => k.toUpperCase())
        .map(
          process.env.NODE_ENV === "development"
            ? fetchLocalTickerPrice
            : function(ticker, i) {
                return new Promise((res) => {
                  return fetch(getURL(ticker, i))
                    .then((r) => r.json())
                    .then((data) => {
                      res({ name: ticker, data });
                    });
                });
              }
        )
    ).then((d) => {
      d.forEach((investment) => {
        const { name, data } = investment;
        const closingPrice = data.results ? data.results[0].c : 0;
        const closingTime = data.results ? data.results[0].t : 0;
        const purchaseHistory = Object.entries(allPurchases)
          .map(([, purchases]) => purchases[name.toLowerCase()])
          .filter((a) => a);

        this.stocks.push({
          closingPrice,
          breakEvenPrice: this.breakEvenPrice(purchaseHistory),
          closingTime: new Date(closingTime),
          ...processSymbol(name.toLowerCase(), closingPrice),
        });
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/stocks.scss";
</style>
