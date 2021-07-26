import Vue from "vue";
import App from "./App.vue";
import VueSidebarMenu from "vue-sidebar-menu";
import VueFeatherIcon from "vue-feather-icon";
import "@/assets/app.scss";
import "@/assets/sidebar.scss";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(VueFeatherIcon);
Vue.use(VueSidebarMenu);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
