import Vue from "vue";
import VueRouter from "vue-router";
import App from "../App.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
    beforeEnter: (to, from, next) => {
      if (store.state.version !== localStorage.getItem("version")) {
        store.commit("clearCart");
        next();
      }
      next();
    },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
