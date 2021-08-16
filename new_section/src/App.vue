<template>
  <div id="app">
    <div class="sidebar">
      <ul class="ul">
        <li class="li item active">Home</li>
        <li class="li title">
          <div>Title</div>
          <ul id="inner-wrapper">
            <li class="li item active">Subtitle1</li>
            <li class="li item">Subtitle2Subtitle2Subtitle2</li>
            <li class="li item active">subtitel3</li>
          </ul>
        </li>
        <li class="li item">Setting</li>
        <li class="li item">Help</li>
        <li class="li item">Password</li>
        <li class="li item">Sign Out</li>
      </ul>
    </div>
    <div
      id="portfolio"
      :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]"
    >
      <img alt="Vue logo" src="./assets/logo.png" />
      <!-- <div id="entry" /> -->
      <i data-feather="camera-off"></i>
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import start from "./bubbles";
import * as d3 from "d3";

export default {
  name: "App",
  mounted() {
    this.onResize();
    feather.replace();
    window.addEventListener("resize", this.onResize);
    start(d3);
    let items = document.querySelectorAll(".item");

    items.forEach((item) => {
      item.addEventListener("click", () => {
        console.log("item", item);
        items.forEach((item) => item.classList.remove("active"));
        item.classList.add("active");
      });
    });
  },
  methods: {
    handleClick() {},
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
      this.menu[0].title = this.collapsed ? "JP" : "Jeffrey Piccirillo";
    },
    onItemClick() {},
    onResize() {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true;
        this.collapsed = true;
      } else {
        this.isOnMobile = false;
        this.collapsed = false;
      }
    },
  },
  data() {
    return {
      collapsed: false,
      isOnMobile: false,
      menu: [
        {
          header: true,
          title: "Jeffrey Piccirillo",
          hiddenOnCollapse: false,
        },
        {
          icon: "fas fa-chart-area",
          href: "/",
          title: "Home",
        },
        {
          icon: "fas fa-globe-americas",
          href: "/",
          title: "Places",
        },
        {
          icon: "fas fa-users",
          href: "/",
          title: "People",
        },
        {
          icon: "fas fa-water",
          href: "/",
          title: "Surf",
        },
        {
          title: "Mapping",
          icon: "fas fa-map-marked",
          child: [
            {
              href: "/charts/sublink",
              title: "Geoical",
            },
            {
              href: "/charts/sublink",
              title: "Medieval Spain",
            },
            {
              href: "/charts/sublink",
              title: "Politicaopleth",
            },
            {
              href: "/charts/sublink",
              title: "Campus Walking Map",
            },
            {
              href: "/charts/sublink",
              title: "Geological",
            },
            {
              href: "/charts/sublink",
              title: "Medieval Spain",
            },
            {
              href: "/charts/s",
              title: "Polithoropleth",
            },
            {
              href: "/charts/sublink",
              title: "Campus Walking Map",
            },
          ],
        },
        {
          icon: "fas fa-font",
          href: "/",
          title: "Font",
        },
        {
          title: "Programming",
          icon: "fas fa-laptop",
          child: [
            {
              href: "/charts/sublink",
              title: "Politicaopleth",
            },
            {
              href: "/charts/sublink",
              title: "Campus Walking Map",
            },
            {
              href: "/charts/sublink",
              title: "Geological",
            },
            {
              href: "/charts/sublink",
              title: "Medieval Spain",
            },
            {
              href: "/charts/s",
              title: "Polithoropleth",
            },
            {
              href: "/charts/sublink",
              title: "Campus Walking Map",
            },
            {
              href: "/charts/sublink",
              title: "Geological",
            },
            {
              href: "/charts/sublink",
              title: "Medieval Spain",
            },
            {
              href: "/charts/sublink",
              title: "Political / Choropleth",
            },
            {
              href: "/charts/sublink",
              title: "Campus Walking Map",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
body {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
#app {
  display: grid;
  grid-template-columns: min-content auto;
  height: 100vh;
}
#portfolio {
  /* padding-left: 250px; */
  transition: 0.3s ease;
}
#portfolio.collapsed {
  padding-left: 65px;
}
#portfolio.onmobile {
  padding-left: 65px;
}
</style>
