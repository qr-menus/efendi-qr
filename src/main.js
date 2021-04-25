import Vue from "vue";
import App from "./App.vue";
import "./style/tailwind.css";
import router from "./router";
import store from "./store";
import VueScrollactive from "vue-scrollactive";
import "./utils/localeFilter";

Vue.config.productionTip = false;
Vue.use(VueScrollactive);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
