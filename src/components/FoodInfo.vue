<template>
  <div class="w-full">
    <div class="relative">
      <img
        class="object-cover object-center w-full bg-gray-100"
        :src="`../images/${category}/${category}_${id}.webp`"
        alt=""
      />
      <div class="absolute flex space-x-2 bottom-4 right-4">
        <svg
          @click="liked = true"
          xmlns="http://www.w3.org/2000/svg"
          class="w-9 h-9"
          :class="{ hidden: liked }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#ED2024"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <svg
          @click="liked = false"
          xmlns="http://www.w3.org/2000/svg"
          v-if="liked"
          class="w-9 h-9"
          viewBox="0 0 20 20"
          fill="#ED2024"
        >
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
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
          <span class="text-lg text-primary">- {{ product.price_1 }} сум</span>
        </h2>
        <h2 v-if="product.price_05">
          / 0.5x
          <span class="text-lg text-primary">- {{ product.price_05 }} сум</span>
        </h2>
      </div>
      <div class="flex items-center mb-4">
        <button
          @click="$emit('close', close)"
          class="w-full p-2 text-white rounded-lg bg-primary"
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
