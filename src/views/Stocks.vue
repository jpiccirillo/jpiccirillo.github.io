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
          <div>Closing price: ${{ s.closingPrice }}</div>
          <div class="">Break even / avg: ${{ s.breakEvenPrice }}</div>
          <div class="">25% return: ${{ s._25 }}</div>
          <div class="">Current return: {{ s.currentReturn }}%</div>
          <div>
            {{
              s.closingTime.toLocaleString([], {
                month: "numeric",
                day: "numeric",
              })
            }}
          </div>
        </div>
      </div>
    </div>
    <div id="chartContainer"></div>
  </section>
</template>

<script>
import { allPurchases } from "@/assets/javascript/stocks/original";
import {
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
    numShares(purchaseHistory) {
      return purchaseHistory.reduce((total, { shares }) => total + shares, 0);
    },
    averagePrice(purchaseHistory) {
      // Calculate the total cost of the shares currently held
      const totalCost = purchaseHistory.reduce((total, { shares, basis }) => {
        return total + shares * basis;
      }, 0);

      // Calculate the average cost per share for the currently held shares
      return (totalCost / this.numShares(purchaseHistory)).toFixed(2);
    },
    _25PercentReturn(purchaseHistory) {
      return (this.averagePrice(purchaseHistory) * 1.25).toFixed(2);
    },
    currentReturn(closingPrice, purchaseHistory) {
      const amountRemaining = closingPrice / this.averagePrice(purchaseHistory);
      const returnAsPercent = 100 * (amountRemaining - 1);
      return returnAsPercent.toFixed(2);
    },
  },
  mounted() {
    Promise.all(
      Object.keys(allPurchases.first)
        .map((k) => k.toUpperCase())
        .map(fetchLocalTickerPrice)
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
          breakEvenPrice: this.averagePrice(purchaseHistory),
          _25: this._25PercentReturn(purchaseHistory),
          closingTime: new Date(closingTime),
          currentReturn: this.currentReturn(closingPrice, purchaseHistory),
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
