import Vue from "vue";
import App from "./App.vue";
import VueSidebarMenu from "vue-sidebar-menu";
import VueFeatherIcon from "vue-feather-icon";
import "@/assets/scss/app.scss";
import "@/assets/scss/voronoi.scss";
import "@/assets/scss/fonts.scss";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "@fortawesome/fontawesome-free/css/all.css";
import router from './router'

Vue.use(VueFeatherIcon);
Vue.use(VueSidebarMenu);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");