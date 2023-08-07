import Vue from "vue";
import Vuex from "vuex";
import { loadData } from "../services/api/dataService";
import { refactorJsonData } from "../services/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    remoteData: {},
    categories: {},
    version: "0.1",
    locale: localStorage.getItem("locale") || "ru",
    favouritesOn: true,
    verticalCard: true,
    loading: false,
    successMessageVisible: false,
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
    successMessageVisible: false,
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
            favourite.name.ru === payload.name.ru &&
            favourite.portion.text === payload.portion.text
          )
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    clearCart(state) {
      state.favourites = [];
      localStorage.setItem("favourites", JSON.stringify([]));
    },


    LOADING(state, loading){
      state.loading = loading
    },
    REMOTE_DATA(state, data){
      state.remoteData = data
    },
    CATEGORIES(state, data){
      state.categories = data
    },
  },
  actions: {
    syncData({commit}, payload){
      commit("LOADING", true)
      return new Promise((resolve, reject) => {
        loadData(payload).then(response => {
          if(response.status == 200){
            if(response.data?.branch != null) {
              commit("REMOTE_DATA", response.data)
              commit("CATEGORIES", refactorJsonData(response.data, payload))
              resolve()
            }else {
              reject(`${payload.slug} branch was not found!`)
            }
            
          }else{
            reject("Something went wrong")
          }
        })
        .catch(() => {
          reject("Failed to load response data")
        })
        .finally(() => {
          commit("LOADING", false)
        })
      })
    },
  },
  modules: {},
});
