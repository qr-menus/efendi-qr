<template>
  <div class="w-full">
    <img
      class="object-cover object-center w-full bg-yellow-400"
      :src="`/images/${category}/${category}_${id}.webp`"
      alt=""
    />
    <div class="p-5 text-left">
      <h2 class="text-2xl font-black capitalize">
        {{ getField("name") }}
      </h2>
      <p class="pr-2 my-4 overflow-y-auto text-gray-500 max-h-40 sm:max-h-64">
        {{ getField("ingredients") }}
      </p>
      <hr class="my-4" />
      <div class="flex mb-4 space-x-2 font-bold md:text-lg">
        <h2>
          1x
          <span class="text-xl text-yellow-500"
            >- {{ product.price_1 }} sum</span
          >
        </h2>
        <h2 v-if="product.price_05">
          / 0.5x
          <span class="text-xl text-yellow-500"
            >- {{ product.price_05 }} sum</span
          >
        </h2>
      </div>
      <div class="flex items-center mb-5">
        <button
          @click="$emit('close', close)"
          class="w-full p-3 font-medium text-white bg-yellow-500 rounded-lg"
        >
          <span v-if="$store.state.locale == 'ru'"> НАЗАД</span>
          <span v-else> CLOSE</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      liked: false,
    };
  },
  computed: {
    getField() {
      return (field) => {
        const obj = this.product[this.$options.filters.locale(field)];
        return obj && obj.toLowerCase();
      };
    },
  },
};
</script>

<style></style>
