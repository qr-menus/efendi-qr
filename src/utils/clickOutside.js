import Vue from "vue";

Vue.directive("click-outside", {
  bind: (el, binding, vnode) => {
    el.clickOutsideEvent = (event) => {
      // here I check that click was outside the el and his children
      // eslint-disable-next-line eqeqeq
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});
