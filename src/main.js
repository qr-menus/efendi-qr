import Vue from "vue";
import App from "./App.vue";
import "./style/tailwind.css";
import router from "./router";
import store from "./store";
import VueScrollactive from "vue-scrollactive";
import "./utils/localeFilter";
import "./utils/clickOutside";
import YmapPlugin from "vue-yandex-maps";
import VueCurrencyFilter from "vue-currency-filter";
import VueMask from "v-mask";
import { ValidationProvider } from "vee-validate";
import "./utils/validate";

const moneyConfig = {
  // v-money config
  decimal: ".",
  thousands: ",",
  precision: 0,
  masked: false,
  // currency filter configs
  thousandsSeparator: ",",
  fractionCount: 0,
  fractionSeparator: ".",
};

const settings = {
  apiKey: "3e7930fe-d6cb-40aa-a554-38c9f4cfb8f5",
  lang: "ru_RU",
  coordorder: "latlong",
  version: "2.1",
};

Vue.config.productionTip = false;
Vue.use(VueScrollactive);
Vue.use(YmapPlugin, settings);
Vue.use(VueMask);
Vue.use(VueCurrencyFilter, moneyConfig);

Vue.component("ValidationProvider", ValidationProvider);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
