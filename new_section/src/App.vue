<template>
  <div id="app">
    <div class="sidebar">
      <ul
        class="ul"
        :class="sidebarClass"
        @click.capture="expandSidebar($event)"
      >
        <li
          class="li item"
          @click.stop="setSwoop('home')"
          :class="isSwoop('home')"
        >
          <i data-feather="home"></i><span class="text">Home</span>
        </li>
        <li
          class="li item"
          @click.stop="setSwoop('font')"
          :class="isSwoop('font')"
        >
          <i data-feather="framer"></i><span class="text">Font</span>
        </li>
        <li
          class="li title"
          :class="`${isSwoop('map')} ${isActiveDropdown('map')}`"
          @click="showDropdown('map')"
        >
          <div class="title-header">
            <i data-feather="map"></i>
            <span class="text">Mapping</span>
            <i data-feather="chevron-down" class="expand-icon"></i>
          </div>
          <ul id="inner-wrapper">
            <li class="li item" @click.stop="setSwoop('map')">
              <span class="text">Geological</span>
            </li>
            <li class="li item" @click.stop="setSwoop('map')">
              <span class="text">Medieval Spain</span>
            </li>
            <li class="li item" @click.stop="setSwoop('map')">
              <span class="text">Political / Choropleth</span>
            </li>
            <li class="li item" @click.stop="setSwoop('map')">
              <span class="text">Campus Walking Map</span>
            </li>
          </ul>
        </li>
        <li
          class="li title"
          :class="`${isSwoop('p')} ${isActiveDropdown('p')}`"
          @click="showDropdown('p')"
        >
          <div class="title-header">
            <i data-feather="monitor"></i>
            <span class="text">Programming</span>
            <i data-feather="chevron-down" class="expand-icon"></i>
          </div>
          <ul id="inner-wrapper">
            <li class="li item" @click.stop="setSwoop('p')">
              <span class="text">D3 Interactive Map</span>
            </li>
            <li class="li item" @click.stop="setSwoop('p')">
              <span class="text">Statistical Power Applet</span>
            </li>
            <li class="li item" @click.stop="setSwoop('p')">
              <span class="text">Fitbit Data Visualization</span>
            </li>
            <li class="li item" @click.stop="setSwoop('p')">
              <span class="text">Mint Financial Data</span>
            </li>
            <li class="li item" @click.stop="setSwoop('p')">
              <span class="text">Computer Productivity</span>
            </li>
          </ul>
        </li>
        <li
          class="li title"
          :class="`${isSwoop('photo')} ${isActiveDropdown('photo')}`"
          @click="showDropdown('photo')"
        >
          <div class="title-header">
            <i data-feather="camera"></i>
            <span class="text">Photography</span>
            <i data-feather="chevron-down" class="expand-icon"></i>
          </div>
          <ul id="inner-wrapper">
            <li class="li item" @click.stop="setSwoop('photo')">
              <span class="text">Places</span>
            </li>
            <li class="li item" @click.stop="setSwoop('photo')">
              <span class="text">People</span>
            </li>
            <li class="li item" @click.stop="setSwoop('photo')">
              <span class="text">Surf</span>
            </li>
          </ul>
        </li>
        <li
          class="li item"
          @click.stop="setSwoop('abt')"
          :class="isSwoop('abt')"
        >
          <i data-feather="smile"></i><span class="text">About</span>
        </li>
      </ul>
    </div>
    <div id="portfolio" @click="contractSidebar">
      <router-view id="router" />
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import { routeConfig } from "@/router/";

export default {
  name: "App",
  data() {
    return {
      activeItem: "none",
      activeDropdown: "none",
      sidebarClass: "",
    };
  },
  mounted() {
    feather.replace();
    this.activeItem = this.$route.meta.sidebarName;
  },
  methods: {
    setSwoop(name) {
      this.activeItem = name;
      this.sidebarClass = ""; // Contract sidebar when sthing's clicked
      this.activeDropdown = ""; // Close all dropdowns
      this.$router.push(this.getRouterNameFromSidebarName(name));
    },
    isSwoop(name) {
      return this.activeItem === name ? "active" : "";
    },
    showDropdown(name) {
      this.activeDropdown = this.activeDropdown === name ? "" : name;
    },
    isActiveDropdown(name) {
      return this.activeDropdown === name ? "clicked" : "";
    },
    expandSidebar(e) {
      if (this.sidebarClass !== "clicked") {
        this.sidebarClass = "clicked";
        e.stopImmediatePropagation();
      }
    },
    contractSidebar() {
      this.sidebarClass = "";
      this.activeDropdown = "";
    },
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
      this.menu[0].title = this.collapsed ? "JP" : "Jeffrey Piccirillo";
    },
    getRouterNameFromSidebarName(name) {
      return routeConfig.find((i) => i.meta.sidebarName === name).path;
    },
  },
};
</script>
