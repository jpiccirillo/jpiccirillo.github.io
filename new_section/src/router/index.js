import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
export const routeConfig = routes;
