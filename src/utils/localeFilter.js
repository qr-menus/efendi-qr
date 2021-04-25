import Vue from "vue";
import store from "../store";

function localeFilter(field) {
  // name -> name_en || name_ru
  return `${field}_${store.state.locale}`;
}

Vue.filter("locale", localeFilter);
