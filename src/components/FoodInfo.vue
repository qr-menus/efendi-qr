<template>
  <div class="w-full">
    <div class="relative">
      <img
        class="object-cover object-center w-full bg-yellow-400"
        :src="`/images/${category}/${product.id}.webp`"
        alt=""
      />
      <!-- <button
        @click.stop="
          isInFavourites ? removeFromFavourites() : addToFavourites()
        "
        class="absolute text-white rounded-md bottom-3 right-3 focus:outline-none"
      >
        <span class="sr-only">Close panel</span>

        <svg
          v-if="isInFavourites"
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 h-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button> -->
    </div>
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
      <!-- <div class="flex items-center mb-5">
        <button
          @click="$emit('close', close)"
          class="w-full p-3 font-medium text-white bg-yellow-500 rounded-lg"
        >
          <span v-if="$store.state.locale == 'ru'"> НАЗАД</span>
          <span v-else> CLOSE</span>
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    ...mapState({
      favourites: (state) => state.favourites,
    }),
    getField() {
      return (field) => {
        const obj = this.product[this.$options.filters.locale(field)];
        return obj && obj.toLowerCase();
      };
    },
    isInFavourites() {
      return this.favourites.some(
        (favourite) => favourite.name_tr === this.product.name_tr
      );
    },
  },
  methods: {
    addToFavourites() {
      if (this.isInFavourites) return;
      this.$store.commit("addToFavourites", this.product);
    },
    removeFromFavourites() {
      if (!this.isInFavourites) return;
      this.$store.commit("removeFromFavourites", this.product);
    },
  },
};
</script>
