<template>
  <div id="app">
    <div class="sidebar">
      <ul
        class="ul"
        :class="sidebarClass"
        @click.capture="expandSidebar($event)"
      >
        <router-link :to="{ name: 'Home' }" tag="span">
          <li
            class="li item"
            @click="setSwoop('home')"
            :class="isSwoop('home')"
          >
            <i data-feather="home"></i><span class="text">Home</span>
          </li></router-link
        >
        <li
          class="li title"
          :class="`${isSwoop('dev')} ${isActiveDropdown('dev')}`"
          @click="showDropdown('dev')"
        >
          <div class="title-header">
            <i data-feather="monitor"></i>
            <span class="text">Programming</span>
            <i data-feather="chevron-down" class="expand-icon"></i>
          </div>
          <ul id="inner-wrapper">
            <router-link
              :to="{ name: 'GanttChart' }"
              tag="span"
              @click.stop.native="setSwoop('dev')"
            >
              <li class="li item">
                <span class="text">Interactive Gantt Chart</span>
              </li>
            </router-link>
            <router-link
              :to="{ name: 'PowerApplet' }"
              tag="span"
              @click.stop.native="setSwoop('dev')"
            >
              <li class="li item">
                <span class="text">Statistical Power Applet</span>
              </li>
            </router-link>
            <router-link
              :to="{ name: 'VOLT' }"
              tag="span"
              @click.stop.native="setSwoop('dev')"
            >
              <li class="li item">
                <span class="text">VOLT Application</span>
              </li>
            </router-link>
            <router-link
              :to="{ name: 'Moment' }"
              tag="span"
              @click.stop.native="setSwoop('dev')"
            >
              <li class="li item">
                <span class="text">App Usage</span>
              </li>
            </router-link>
          </ul>
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
            <router-link
              :to="{ name: 'Geological' }"
              tag="span"
              @click.stop.native="setSwoop('map')"
            >
              <li class="li item">
                <span class="text">Geological</span>
              </li>
            </router-link>
            <router-link
              :to="{ name: 'MapsSpain' }"
              tag="span"
              @click.stop.native="setSwoop('map')"
            >
              <li class="li item">
                <span class="text">Medieval Spain</span>
              </li>
            </router-link>
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
            <router-link
              :to="{ name: 'Places' }"
              tag="span"
              @click.stop.native="setSwoop('photo')"
            >
              <li class="li item">
                <span class="text">Places</span>
              </li></router-link
            >
            <router-link
              :to="{ name: 'People' }"
              tag="span"
              @click.stop.native="setSwoop('photo')"
            >
              <li class="li item">
                <span class="text">People</span>
              </li>
            </router-link>
            <router-link
              :to="{ name: 'Surf' }"
              tag="span"
              @click.stop.native="setSwoop('photo')"
            >
              <li class="li item">
                <span class="text">Surf</span>
              </li>
            </router-link>
          </ul>
        </li>
        <a href="https://www.linkedin.com/in/jfpiccirillo/" target="_blank"
          ><li class="li item">
            <i data-feather="linkedin"></i><span class="text">LinkedIn</span>
          </li></a
        >
        <a href="https://github.com/jpiccirillo" target="_blank"
          ><li class="li item">
            <i data-feather="github"></i><span class="text">Github</span>
          </li></a
        >
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

<style lang="scss" scoped>
@import "@/assets/scss/newSidebar.scss";
@import "@/assets/scss/feather-colors.scss";
</style>
