<template>
  <scrollactive
    ref="scrollContainer"
    active-class="active"
    style="scroll-behavior: smooth; transition-duration: 0.5s"
    :offset="185"
    class="flex items-center px-4 py-2 mx-auto space-x-2 overflow-x-auto max-w-7xl"
    @itemchanged="onItemChanged"
  >
    <a
      v-for="(item, key) in categories"
      :key="item.name_ru"
      :href="`#${key}`"
      class="flex-shrink-0 px-3 py-2 font-medium leading-4 rounded-full scrollactive-item"
    >
      {{ item[$options.filters.locale("name")] }}
    </a>
  </scrollactive>
</template>

<script>
export default {
  props: {
    categories: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onItemChanged(e, curr, lastActive) {
      if (e) {
        const categories = Object.keys(this.categories)
          .map((key, index) => ({
            [key]: index,
          }))
          .reduce((prev, curr) => {
            return { ...prev, ...curr };
          }, {});

        if (curr && lastActive) {
          const currCategory = curr.href.split("#")[1];
          const lastActiveCategory = lastActive.href.split("#")[1];

          if (categories[currCategory] > categories[lastActiveCategory]) {
            this.$refs["scrollContainer"].$el.scrollLeft += curr.offsetWidth;
          } else {
            this.$refs["scrollContainer"].$el.scrollLeft -= curr.offsetWidth;
          }
        }
      }
    },
  },
};
</script>

<style></style>
