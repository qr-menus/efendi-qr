<template>
  <div class="w-full">
    <div class="relative">
      <img
        class="object-cover object-center w-full bg-yellow-400"
        :src="`/images/${category}/${product.id}.webp`"
        alt=""
      />
      <div
        @click="$emit('close')"
        class="absolute z-10 cursor-pointer bottom-2 right-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-12 h-12"
          viewBox="0 0 20 20"
          fill="#fefefe"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
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
      <div v-if="favouritesOn" class="flex space-x-3">
        <template v-if="!isInFavourites">
          <FoodCount :count.sync="count" />
          <button
            @click="addToFavourites"
            class="w-full p-3 font-semibold text-white bg-yellow-500 rounded-lg"
          >
            <span>Добавить в корзину</span>
          </button>
        </template>
        <button
          v-else
          type="button"
          class="w-full p-3 font-semibold text-white bg-gray-300 rounded-lg"
          @click="$emit('close')"
        >
          <span>Уже в корзине</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FoodCount from "./FoodCount";

export default {
  components: { FoodCount },
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
      count: 1,
    };
  },
  computed: {
    ...mapState({
      favourites: (state) => state.favourites,
      favouritesOn: (state) => state.favouritesOn,
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
      this.$store.commit("addToFavourites", {
        ...this.product,
        count: this.count,
      });
      this.$emit("close");
      this.count = 1;
    },
    removeFromFavourites() {
      if (!this.isInFavourites) return;
      this.$store.commit("removeFromFavourites", this.product);
    },
  },
};
</script>
