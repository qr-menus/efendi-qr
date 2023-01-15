import tempData from "../data/tempCategories.json";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logo: tempData.logo,
    favicon: tempData.favicon,
    contacts: tempData.contacts,
    version: "0.1",
    favourites:
      (localStorage.getItem("favourites") &&
        JSON.parse(localStorage.getItem("favourites"))) ||
      [],
    languages: tempData.languages,
    tempCategories: Object.fromEntries(
      Object.entries(tempData.branches[0].categories).map(([key, categories])=>{
        return [
          key,
          {
            ...categories,
          }
        ]
      })
    ),
    locale: localStorage.getItem("locale") || "ru",
    favouritesOn: true,
    verticalCard: true,
  },
  mutations: {
    setLocale(state, locale) {
      state.locale = locale;
      localStorage.setItem("locale", locale);
    },
    increment(state, product) {
      state.favourites = state.favourites.map((item) =>
        item.id === product.id && item.portion.text === product.portion.text
          ? { ...item, count: item.count + 1 }
          : item
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    decrement(state, product) {
      state.favourites = state.favourites.map((item) =>
        item.id === product.id && item.portion.text === product.portion.text
          ? { ...item, count: item.count - 1 }
          : item
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    addToFavourites(state, payload) {
      state.favourites.push(payload);
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
      localStorage.setItem("version", state.version);
    },
    removeFromFavourites(state, payload) {
      state.favourites = state.favourites.filter(
        (favourite) =>
          !(
            favourite.name_ru === payload.name_ru &&
            favourite.portion.text === payload.portion.text
          )
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    clearCart(state) {
      state.favourites = [];
      localStorage.setItem("favourites", JSON.stringify([]));
    },
  },
  actions: {},
  modules: {},
});
