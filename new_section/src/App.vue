<template>
  <div id="app">
    <div class="sidebar">
      <ul class="ul">
        <li class="li item active">
          <i data-feather="home"></i><span class="text">Home</span>
        </li>
        <li class="li title">
          <div class="title-header">
            <i data-feather="settings"></i>
            <span class="text">Title</span>
          </div>
          <ul id="inner-wrapper">
            <li class="li item active">
              <i data-feather="camera-off"></i
              ><span class="text">Subtitle1</span>
            </li>
            <li class="li item">
              <i data-feather="camera-off"></i
              ><span class="text">2Subtitle2</span>
            </li>
            <li class="li item active">
              <i data-feather="camera-off"></i
              ><span class="text">Subtitle3</span>
            </li>
          </ul>
        </li>
        <li class="li item">
          <i data-feather="settings"></i><span class="text">Settings</span>
        </li>
        <li class="li item">
          <i data-feather="help-circle"></i><span class="text">Help</span>
        </li>
        <li class="li item">
          <i data-feather="key"></i><span class="text">Password</span>
        </li>
        <li class="li item">
          <i data-feather="log-out"></i><span class="text">Sign Out</span>
        </li>
      </ul>
    </div>
    <div
      id="portfolio"
      :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]"
    >
      <div id="entry" />
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import start from "@/assets/javascript/bubbles.js";
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
html,
body,
#app,
.sidebar,
.ul {
  height: 100%;
}
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
}
#portfolio {
  /* padding-left: 250px; */
  transition: 0.3s ease;
}
/* #portfolio.collapsed {
  padding-left: 65px;
} */
/* #portfolio.onmobile { */
  /* padding-left: 65px; */
/* } */
</style>
