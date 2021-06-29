<template>
  <SlideOverVertical>
    <template #trigger="{ onClick }">
      <div
        class="flex items-center mt-2.5 rounded-xl h-full bg-white card-shadow p-1.5 cursor-pointer"
        @click="onClick"
      >
        <div>
          <img
            class="object-cover card-image w-16 bg-yellow-400 rounded-xl"
            :src="`/images/${category}/${product.id}.webp`"
            alt="food"
          />
        </div>
        <div class="ml-2">
          <h2
            class="m1.5-2 text-lg one-line-text font-medium text-gray-600 capitalize"
          >
            {{ getField("name") }}
          </h2>
          <h6 class="w-full text-xl font-black text-yellow">
            {{ product.portions[0].price | currency }}
            <span v-if="$store.state.locale == 'ru'"> сум</span>
            <span v-else>sum</span>
          </h6>
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
      ></FoodInfo>
    </template>
  </SlideOverVertical>
</template>

<script>
import FoodInfo from "./FoodInfo";
import SlideOverVertical from "./core/SlideOverVertical.vue";
export default {
  name: "FoodCardHorizontal",
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
        const obj = this.product[this.$options.filters.locale(field)];
        return obj && obj.toLowerCase();
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-shadow {
  box-shadow: 0px 2px 36px -7px rgba(0, 0, 0, 0.12);
}

.card-image {
  min-width: 4rem;
}
.text-yellow {
  color: #f5b70b;
}
</style>
