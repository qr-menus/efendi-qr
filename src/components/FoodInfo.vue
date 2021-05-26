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
      <p
        class="pr-2 mt-4 mb-6 overflow-y-auto text-gray-500 max-h-40 sm:max-h-64"
      >
        {{ getField("ingredients") }}
      </p>
      <div class="flex mb-5 space-x-3 font-bold md:text-lg">
        <span
          v-for="(portion, index) in product.portions"
          :key="`${product.name_tr}-${portion.text}`"
          class="inline-flex items-center px-2.5 py-1.5 rounded-md text-base font-medium bg-gray-100 text-gray-800 cursor-pointer"
          :class="{ 'border border-gray-700': index === selectedPortionIndex }"
          @click="selectPortion(index)"
        >
          {{ portion.text }}
        </span>
      </div>

      <div class="flex items-center justify-between mb-5">
        <FoodCount :count.sync="count" />

        <span v-if="product.portions" class="text-2xl font-black text-gray-800"
          >{{
            product.portions[selectedPortionIndex].price | currency
          }}
          сум</span
        >
      </div>
      <div class="flex space-x-3">
        <button
          v-if="!isInFavourites"
          @click="addToFavourites"
          class="w-full p-3 font-semibold text-white bg-yellow-500 rounded-lg"
        >
          <span>В корзинку</span>
        </button>
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
      selectedPortionIndex: 0,
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
        (favourite) =>
          favourite.name_tr === this.product.name_tr &&
          this.product.portions[this.selectedPortionIndex].text ===
            favourite.portion.text
      );
    },
  },
  created() {},
  methods: {
    selectPortion(index) {
      this.selectedPortionIndex = index;
    },
    addToFavourites() {
      if (this.isInFavourites) return;
      this.$store.commit("addToFavourites", {
        ...this.product,
        portion: this.product.portions[this.selectedPortionIndex],
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
