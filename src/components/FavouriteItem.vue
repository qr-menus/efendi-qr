<template>
  <div>
    <div class="flex items-center space-x-2 cursor-pointer">
      <SlideOverVertical>
        <template #trigger="{ onClick }">
          <div @click="onClick" class="flex items-center space-x-2">
            <img
              class="object-cover w-16 h-16 bg-gray-100 rounded-xl"
              src="../assets/dil_shurba.webp"
              alt="food"
            />
            <div class="text-left">
              <h2 class="text-lg text-gray-600 one-line-text">
                {{ "MAYONEZLI SALAM KASAR asd SALATASI sdfsdfs".toLowerCase() }}
              </h2>
              <h6 class="font-bold">25,000 sum</h6>
            </div>
          </div>
        </template>
        <template #default="{ close }">
          <FoodInfo
            v-if="product"
            :product="product"
            :id="id"
            :category="category"
            @close="close"
          />
        </template>
      </SlideOverVertical>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-primary"
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
    </div>
  </div>
</template>

<script>
import SlideOverVertical from "./SlideOverVertical.vue";
import FoodInfo from "./FoodInfo";
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
  components: {
    SlideOverVertical,
    FoodInfo,
  },
  name: "FavouriteItem",
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
