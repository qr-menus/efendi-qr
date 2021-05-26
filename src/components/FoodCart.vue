<template>
  <CartSlideOver>
    <template #trigger="{ onClick }">
      <div
        class="fixed flex flex-col items-center justify-center w-56 p-3 rounded-full cursor-pointer -ml-28 bottom-5 left-1/2 bg-primary"
        @click="onClick"
      >
        <p class="font-bold text-white">
          Выбрано {{ favourites.length }} блюдо
        </p>
      </div>
    </template>
    <template #default="{}">
      <div class="flex flex-col w-full h-full">
        <div class="sticky top-0 w-full px-4 pt-5 bg-white rounded-t-xl">
          <h2 class="text-xl font-bold text-left text-gray-700">Корзина</h2>
          <hr class="my-2" />
        </div>
        <div class="flex flex-col px-4 pb-2 space-y-3">
          <FavouriteItem
            v-for="(product, $productIndex) in favourites"
            :key="`product-${$productIndex}`"
            :id="$productIndex + 1"
            :product="product"
          />
        </div>

        <div
          class="sticky bottom-0 px-4 pt-3 pb-8 bg-white divide-y divide-gray-400 divide-dashed"
        >
          <div class="flex items-center justify-between pb-3">
            <span class="mr-3 font-semibold text-gray-500">
              Обслуживание (10%):
            </span>
            <span class="text-xl font-black text-gray-700"
              >{{ servicePrice | currency }} сум</span
            >
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="mr-3 font-semibold text-gray-500">
              Общая стоимость:
            </span>
            <span class="text-xl font-black text-gray-700"
              >{{ totalPrice | currency }} сум</span
            >
          </div>
        </div>
      </div>
    </template>
  </CartSlideOver>
</template>

<script>
import { mapState } from "vuex";
import CartSlideOver from "./CartSlideOver";
import FavouriteItem from "./FavouriteItem.vue";

export default {
  name: "FoodCart",
  components: { CartSlideOver, FavouriteItem },
  data() {
    return {
      servicePortion: 0.1,
    };
  },
  computed: {
    ...mapState({
      favourites: (state) => state.favourites,
    }),
    servicePrice() {
      return (
        this.favourites.reduce(
          (prev, curr) => +curr.portion.price * curr.count + prev,
          0
        ) * this.servicePortion
      );
    },
    totalPrice() {
      return (
        this.favourites.reduce(
          (prev, curr) => +curr.portion.price * curr.count + prev,
          0
        ) + this.servicePrice
      );
    },
  },
};
</script>

<style></style>
