<template>
  <div id="app">
    <div class="sidebar">
      <ul class="ul">
        <li class="li item active">
          <i data-feather="home"></i><span class="text">Home</span>
        </li>
        <li class="li item">
          <i data-feather="framer"></i><span class="text">Font</span>
        </li>
        <li class="li title">
          <div class="title-header">
            <i data-feather="map"></i>
            <span class="text">Mapping</span>
            <i data-feather="chevron-down" class="expand-icon"></i>
          </div>
          <ul id="inner-wrapper">
            <li class="li item">
              <span class="text">Geological</span>
            </li>
            <li class="li item">
              <span class="text">Medieval Spain</span>
            </li>
            <li class="li item">
              <span class="text">Political / Choropleth</span>
            </li>
            <li class="li item">
              <span class="text">Campus Walking Map</span>
            </li>
          </ul>
        </li>
        <li class="li title">
          <div class="title-header">
            <i data-feather="monitor"></i>
            <span class="text">Programming</span>
            <i data-feather="chevron-down" class="expand-icon"></i>
          </div>
          <ul id="inner-wrapper">
            <li class="li item">
              <span class="text">D3 Interactive Map</span>
            </li>
            <li class="li item">
              <span class="text">Statistical Power Applet</span>
            </li>
            <li class="li item">
              <span class="text">Fitbit Data Visualization</span>
            </li>
            <li class="li item">
              <span class="text">Mint Financial Data</span>
            </li>
            <li class="li item">
              <span class="text">Computer Productivity</span>
            </li>
          </ul>
        </li>
        <li class="li title">
          <div class="title-header">
            <i data-feather="camera"></i>
            <span class="text">Photography</span>
            <i data-feather="chevron-down" class="expand-icon"></i>
          </div>
          <ul id="inner-wrapper">
            <li class="li item">
              <span class="text">Places</span>
            </li>
            <li class="li item">
              <span class="text">People</span>
            </li>
            <li class="li item">
              <span class="text">Surf</span>
            </li>
          </ul>
        </li>
        <li class="li item">
          <i data-feather="smile"></i><span class="text">About</span>
        </li>
      </ul>
    </div>
    <div id="portfolio">
      <div id="entry" />
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";

export default {
  name: "App",
  mounted() {
    this.onResize();
    feather.replace();
    window.addEventListener("resize", this.onResize);
    let items = document.querySelectorAll(".item");

    items.forEach((item) => {
      item.addEventListener("click", () => {
        items.forEach((item) => item.classList.remove("active"));
        item.classList.add("active");
      });
    });

    let titles = document.querySelectorAll(".title");
    let sidebar = document.querySelectorAll(".ul")[0];
    sidebar.addEventListener("click", () => {
      sidebar.classList.add("clicked");
    });

    let mainApp = document.getElementById("portfolio");
    let entries = document.querySelectorAll(".item");
    mainApp.addEventListener("click", () => {
      sidebar.classList.remove("clicked");
      titles.forEach((item) => item.classList.remove("clicked"));
    });
    entries.forEach((e) => {
      e.addEventListener("click", () => {
        sidebar.classList.remove("clicked");
        titles.forEach((item) => item.classList.remove("clicked"));
      });
    });

    titles.forEach((e) => {
      e.addEventListener("click", () => {
        titles.forEach((item) => item.classList.remove("clicked"));
        e.classList.add("clicked");
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
};
</script>
