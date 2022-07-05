<template>
  <div class="pb-12 px-8">
    <button
      @click="changePage('review')"
      class="
        text-lg
        font-semibold
        py-3
        my-1.5
        w-full
        bg-primary
        text-white
        rounded-full
      "
    >
      Отзыв
    </button>

    <button
      @click="changePage('gratitude')"
      class="
        text-lg
        font-semibold
        py-3
        my-1.5
        w-full
        bg-primary
        text-white
        rounded-full
      "
    >
      Благодарность
    </button>

    <button
      @click="changePage('complaint')"
      class="
        text-lg
        font-semibold
        py-3
        my-1.5
        w-full
        bg-primary
        text-white
        rounded-full
      "
    >
      Жалоба
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    changePage(page) {
      if (page === "review") {
        this.$router.push({
          query: { ...this.$route.query, page: `${page}`, step: 1 },
        });
      } else {
        this.$router.push({ query: { ...this.$route.query, page: `${page}` } });
      }
    },
  },
};
</script>
