import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main.vue";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: Main,
  },
  {
    path: "/",
    name: "Main",
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.version !== localStorage.getItem("version")) {
        store.commit("clearCart");
        next();
      }
      next();
    },
  },
  {
    path: "/reviews",
    name: "Reviews",
    component: () =>
      import(/* webpackChunkName: "reviews" */ "../views/Reviews.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    // always scroll to top
    return { y: 0 };
  },
});

export default router;
