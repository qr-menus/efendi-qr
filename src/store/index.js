import data from "../data/categories.json";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: data,
    locale: localStorage.getItem("locale") || "ru",
  },
  mutations: {
    setLocale(state, locale) {
      state.locale = locale;
      localStorage.setItem("locale", locale);
    },
  },
  actions: {},
  modules: {},
});
