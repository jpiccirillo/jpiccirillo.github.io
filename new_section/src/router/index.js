import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Surf from "../views/Surf.vue";
import People from "../views/People.vue";
import PowerApplet from "../views/PowerApplet.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      sidebarName: `home`,
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      sidebarName: `abt`,
    },
  },
  {
    path: "/photos/surf",
    name: "Surf",
    component: Surf,
    meta: {
      sidebarName: `photo`,
    },
  },
  {
    path: "/photos/people",
    name: "People",
    component: People,
    meta: {
      sidebarName: `photo`,
    },
  },
  {
    path: "/development/statistical-power-applet",
    name: "PowerApplet",
    component: PowerApplet,
    meta: {
      sidebarName: `dev`,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
export const routeConfig = routes;
