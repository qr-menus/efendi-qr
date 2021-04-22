<template>
  <SlideOverVertical>
    <template #trigger="{ onClick }">
      <div
        class="flex flex-col items-center justify-between h-full cursor-pointer"
        @click="onClick"
      >
        <div>
          <img
            class="object-cover w-full mb-1 bg-gray-100 rounded-xl"
            :src="`/images/${category}/${category}_${id}.webp`"
            alt="food"
          />
          <h2 class="my-3 text-lg font-medium text-gray-600">
            {{ product.name_tr && product.name_tr.toLowerCase() }}
          </h2>
        </div>
        <h6 class="w-full py-3 font-bold bg-gray-100 rounded-lg text-primary">
          {{ product.price_1 }} sum
        </h6>
      </div>
    </template>
    <template #default="{ close }">
      <FoodInfo
        v-if="product"
        :product="product"
        :id="id"
        :category="category"
        @close="close"
      ></FoodInfo>
    </template>
  </SlideOverVertical>
</template>

<script>
import FoodInfo from "./FoodInfo";
import SlideOverVertical from "./SlideOverVertical.vue";
export default {
  name: "FoodCard",
  components: { FoodInfo, SlideOverVertical },
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
