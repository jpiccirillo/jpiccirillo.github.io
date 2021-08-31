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
      </div>
    </div>
    <div id="chartContainer"></div>
  </section>
</template>

<script>
import { allPurchases } from "@/assets/javascript/stocks/original";
import { getURL, processSymbol } from "@/assets/javascript/stocks/getStockInfo";

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
  mounted() {
    Promise.all(
      Object.keys(allPurchases.first)
        .map((k) => k.toUpperCase())
        .map(function(ticker, i) {
          return new Promise((res) => {
            return fetch(getURL(ticker, i))
              .then((r) => r.json())
              .then((data) => {
                res({ name: ticker, data });
              });
          });
        })
    ).then((d) => {
      d.forEach((investment) => {
        const { name, data } = investment;
        const closingPrice = data.results
          ? data.results[data.results.length - 1].c
          : 0;
        this.stocks.push(processSymbol(name.toLowerCase(), closingPrice));
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/stocks.scss";
</style>
