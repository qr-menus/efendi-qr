<template>
  <div>
    <div
      class="flex items-center justify-between p-1 pr-2 space-x-3 rounded-lg shadow cursor-pointer"
    >
      <SlideOverVertical>
        <template #trigger="{ onClick }">
          <div @click="onClick" class="flex items-center space-x-2">
            <img
              class="object-cover w-20 h-20 bg-yellow-400 rounded-lg"
              :src="`/images/${product.category}/${product.id}.webp`"
              alt="food"
            />
            <div class="text-left">
              <h2
                class="text-lg font-semibold leading-6 text-gray-500 capitalize line-clamp-2"
              >
                <!-- {{ getField("name") }} -->
                {{ product.name_tr && product.name_tr.toLowerCase() }}
              </h2>
              <h6 class="font-bold text-gray-800">{{ product.price_1 }} sum</h6>
            </div>
          </div>
        </template>
        <template #default="{ close }">
          <FoodInfo
            v-if="product"
            :product="product"
            :id="id"
            :category="product.category"
            @close="close"
          />
        </template>
      </SlideOverVertical>
      <div class="flex">
        <button
          v-if="product.count === 1"
          class="py-3 pl-2 pr-1 text-yellow-500 bg-gray-100 rounded-l focus:outline-none"
          @click="removeFromFavourites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
        <button
          v-else
          class="px-2 py-3 text-yellow-500 bg-gray-100 rounded-l focus:outline-none"
          @click="decrement"
        >
          <svg
            v-if="product.count === 1"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div
          class="flex items-center justify-center text-sm font-semibold text-gray-700 bg-gray-100 w-7"
        >
          {{ product.count }}
        </div>
        <button
          class="py-3 pl-1 pr-2 text-yellow-500 bg-gray-100 rounded-r focus:outline-none"
          @click="increment"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SlideOverVertical from "./SlideOverVertical.vue";
import FoodInfo from "./FoodInfo";
import { mapState } from "vuex";
export default {
  name: "FavouriteItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    SlideOverVertical,
    FoodInfo,
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
  },
  methods: {
    decrement() {
      this.$store.commit("decrement", this.product.id);
    },
    increment() {
      this.$store.commit("increment", this.product.id);
    },
    removeFromFavourites() {
      this.$store.commit("removeFromFavourites", this.product);
      if (!this.favourites.length) {
        document.body.classList.remove("overflow-hidden");
      }
    },
  },
};
</script>

<style scoped>
.one-line-text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
