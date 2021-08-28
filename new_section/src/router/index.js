import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Surf from "../views/Surf.vue";
import People from "../views/People.vue";
import PowerApplet from "../views/PowerApplet.vue";
import VOLT from "../views/VOLT.vue";
import Moment from "../views/Moment.vue";

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
  {
    path: "/development/VOLT",
    name: "VOLT",
    component: VOLT,
    meta: {
      sidebarName: `dev`,
    },
  },
  {
    path: "/development/App-usage",
    name: "Moment",
    component: Moment,
    meta: {
      sidebarName: `dev`,
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 }),
});

export default router;
export const routeConfig = routes;
