import Vue from "vue";
import store from "../store";

function localeFilter() {
  //en || ru
  return `${store.state.locale}`;
}

Vue.filter("locale", localeFilter);
