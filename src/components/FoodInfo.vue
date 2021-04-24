<template>
  <div class="w-full">
    <img
      class="object-cover object-center w-full bg-yellow-400"
      src="../assets/shorva1.webp"
      alt=""
    />
    <div class="p-5 text-left">
      <h2 class="text-xl font-black capitalize">
        {{ product.name_ru && product.name_ru.toLowerCase() }}
      </h2>
      <p
        class="pr-2 my-4 overflow-y-auto text-sm text-gray-500 max-h-40 sm:max-h-64"
      >
        {{ product.ingredients_ru && product.ingredients_ru.toLowerCase() }}
      </p>
      <hr class="my-4" />
      <div class="flex mb-4 space-x-2 text-sm font-bold md:text-lg">
        <h2>
          1x
          <span class="text-lg text-yellow-500"
            >- {{ product.price_1 }} сум</span
          >
        </h2>
        <h2 v-if="product.price_05">
          / 0.5x
          <span class="text-lg text-yellow-500"
            >- {{ product.price_05 }} сум</span
          >
        </h2>
      </div>
      <div class="flex items-center mb-4">
        <button
          @click="$emit('close', close)"
          class="w-full p-2 font-medium text-white bg-yellow-500 rounded-lg"
        >
          НАЗАД
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
};
</script>

<style></style>
