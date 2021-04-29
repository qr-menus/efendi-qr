<template>
  <div>
    <div
      class="flex justify-between items-center space-x-3 cursor-pointer rounded-lg shadow p-1 pr-2"
    >
      <SlideOverVertical>
        <template #trigger="{ onClick }">
          <div @click="onClick" class="flex items-center space-x-2">
            <img
              class="object-cover w-16 h-16 bg-yellow-400 rounded-lg"
              :src="`/images/${product.category}/${product.category}_${id}.webp`"
              alt="food"
            />
            <div class="text-left">
              <h2 class="text-lg text-gray-600 one-line-text">
                {{ getField("name") }}
              </h2>
              <h6 class="font-bold">{{ product.price_1 }} sum</h6>
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
      <!-- <button type="button" class="text-primary" @click="removeFromFavourites">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
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
      </button> -->
    </div>
  </div>
</template>

<script>
import SlideOverVertical from "./SlideOverVertical.vue";
import FoodInfo from "./FoodInfo";
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
    getField() {
      return (field) => {
        const obj = this.product[this.$options.filters.locale(field)];
        return obj && obj.toLowerCase();
      };
    },
  },
  methods: {
    removeFromFavourites() {
      this.$store.commit("removeFromFavourites", this.product);
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
