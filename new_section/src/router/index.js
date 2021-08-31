import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Surf from "../views/Surf.vue";
import People from "../views/People.vue";
import Places from "../views/Places.vue";
import PowerApplet from "../views/PowerApplet.vue";
import VOLT from "../views/VOLT.vue";
import Moment from "../views/Moment.vue";
import Geological from "../views/Geological.vue";
import MapsSpain from "../views/MapsSpain.vue";
import Stocks from "../views/Stocks.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      sidebarName: `home`,
      title: () => "Home",
    },
  },
  {
    path: "/photos/surf",
    name: "Surf",
    component: Surf,
    meta: {
      sidebarName: `photo`,
      title: () => "Waves",
    },
  },
  {
    path: "/photos/people",
    name: "People",
    component: People,
    meta: {
      sidebarName: `photo`,
      title: () => "People",
    },
  },
  {
    path: "/photos/places",
    name: "Places",
    component: Places,
    meta: {
      sidebarName: `photo`,
      title: () => "Places",
    },
  },
  {
    path: "/development/statistical-power-applet",
    name: "PowerApplet",
    component: PowerApplet,
    meta: {
      sidebarName: `dev`,
      title: () => "Statistical Power Applet",
    },
  },
  {
    path: "/development/VOLT",
    name: "VOLT",
    component: VOLT,
    meta: {
      sidebarName: `dev`,
      title: () => "Clinical Study Web Application",
    },
  },
  {
    path: "/development/App-usage",
    name: "Moment",
    component: Moment,
    meta: {
      sidebarName: `dev`,
      title: () => "Phone Usage Visualization",
    },
  },
  {
    path: "/mapping/geological",
    name: "Geological",
    component: Geological,
    meta: {
      sidebarName: `map`,
      title: () => "Geological Mapping",
    },
  },
  {
    path: "/mapping/mapsOfSpain",
    name: "MapsSpain",
    component: MapsSpain,
    meta: {
      sidebarName: `map`,
      title: () => "Maps of Medieval Spain",
    },
  },
  {
    path: "/personal/77cde7249d2d4285ca7f402dccb8aeaa",
    name: "StockPortfolio",
    component: Stocks,
    meta: {
      title: () => "Stock Performance",
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

router.beforeEach(async (to, from, next) => {
  document.title = `J Piccirillo :: ${to.meta.title(to)}` || "Jeffrey Piccirillo";
  next();
});

export default router;
export const routeConfig = routes;
