import data from "../data/categories.json";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites:
      (localStorage.getItem("favourites") &&
        JSON.parse(localStorage.getItem("favourites"))) ||
      [],
    categories: Object.fromEntries(
      Object.entries(data).map(([key, category]) => {
        return [
          key,
          {
            ...category,
            products: category.products.map((product) => ({
              ...product,
              category: key,
            })),
          },
        ];
      })
    ),
    locale: localStorage.getItem("locale") || "ru",
    favouritesOn: true,
  },
  mutations: {
    setLocale(state, locale) {
      state.locale = locale;
      localStorage.setItem("locale", locale);
    },
    increment(state, productId) {
      state.favourites = state.favourites.map((item) =>
        item.id === productId ? { ...item, count: item.count + 1 } : item
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    decrement(state, productId) {
      state.favourites = state.favourites.map((item) =>
        item.id === productId ? { ...item, count: item.count - 1 } : item
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    addToFavourites(state, payload) {
      state.favourites.push(payload);
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    removeFromFavourites(state, payload) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite.name_tr !== payload.name_tr
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
  },
  actions: {},
  modules: {},
});
