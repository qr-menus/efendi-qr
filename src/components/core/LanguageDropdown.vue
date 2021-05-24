<template>
  <div class="relative inline-block text-left">
    <div ref="trigger">
      <slot name="trigger" :click="toggle"></slot>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="isOpen"
        v-click-outside="close"
        class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <button
            v-for="item in items"
            :key="item.text"
            class="block w-full px-4 py-2 text-sm"
            :class="
              item.value === locale
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700'
            "
            role="menuitem"
            tabindex="-1"
            @click.stop="selectLang(item.value)"
          >
            {{ item.text }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    items: {
      type: Array,
      required: true,
      validator: (prop) => {
        return prop.every((item) => "text" in item && "value" in item);
      },
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
    }),
  },
  methods: {
    ...mapMutations({
      setLocale: "setLocale",
    }),
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close(event) {
      if (
        !(
          event.target === this.$refs.trigger ||
          this.$refs.trigger.contains(event.target)
        )
      ) {
        this.isOpen = false;
      }
    },
    selectLang(lang) {
      this.setLocale(lang);
      this.isOpen = false;
    },
  },
};
</script>

<style></style>
