<template>
  <SlideOverVertical>
    <template #trigger="{ onClick }">
      <div
        class="flex text-center flex-col items-center justify-between h-full cursor-pointer"
        @click="onClick"
      >
        <div>
          <img
            class="object-cover w-full mb-1 bg-yellow-400 rounded-3xl"
            :src="product.image"
            alt="food"
          />
          <h2 class="my-3 text-lg font-medium text-gray-600 capitalize">
            {{ getField("name") }}
          </h2>
        </div>
        <h6
          class="w-full py-3 font-black text-yellow-500 bg-gray-100 rounded-xl"
        >
          {{ product.portions[0].price | currency }}
          sum
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
import SlideOverVertical from "./core/SlideOverVertical.vue";
export default {
  name: "FoodCardVertical",
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
  computed: {
    getField() {
      return (field) => {
        const obj = this.product[field][this.$options.filters.locale(field)];
        return obj && obj.toLowerCase();
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
