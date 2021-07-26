<template>
  <div id="app">
    <sidebar-menu
      :collapsed="collapsed"
      :menu="menu"
      :width="`250px`"
      :show-one-child="true"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
      :theme="`white-theme`"
    />
    <div
      id="demo"
      :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]"
    >
      <img alt="Vue logo" src="./assets/logo.png" />
      <i data-feather="camera-off"></i>
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
  },
  methods: {
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
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

#demo {
  padding-left: 250px;
  transition: 0.3s ease;
}
#demo.collapsed {
  padding-left: 65px;
}
#demo.onmobile {
  padding-left: 65px;
}
</style>
