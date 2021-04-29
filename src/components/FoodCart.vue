<template>
  <CartSlideOver>
    <template #trigger="{ onClick }">
      <div
        class="fixed bottom-5 left-1/2 -ml-32 w-64 bg-primary rounded-full flex flex-col items-center justify-center cursor-pointer py-4 px-3"
        @click="onClick"
      >
        <p class="font-bold text-white">
          Выбрано {{ favourites.length }} блюдо
        </p>
      </div>
    </template>
    <template #default="{}">
      <div class="flex flex-col h-full w-full space-y-4 px-4 pt-5 pb-10">
        <h2 class="text-left text-gray-700 text-xl font-bold">Корзина</h2>
        <hr class="mb-4" />
        <div class="flex flex-col space-y-3">
          <FavouriteItem
            v-for="(product, $productIndex) in favourites"
            :key="`product-${$productIndex}`"
            :id="$productIndex + 1"
            :product="product"
          />
        </div>

        <div class="divide-y divide-dashed divide-gray-400">
          <div class="flex pb-3">
            <span class="font-bold text-lg text-gray-500 mr-3">
              Обслуживание (15%):
            </span>
            <span class="font-bold text-xl text-gray-800"
              >{{
                favourites.reduce(
                  (prev, curr) => +curr.price_1.replace(" ", "") + prev,
                  0
                ) * 0.15
              }}
              сум</span
            >
          </div>
          <div class="flex py-3">
            <span class="font-bold text-lg text-gray-500 mr-3">
              Общая стоимость:
            </span>
            <span class="font-bold text-xl text-gray-800"
              >{{
                favourites.reduce(
                  (prev, curr) => +curr.price_1.replace(" ", "") + prev,
                  0
                )
              }}
              сум</span
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
  computed: {
    ...mapState({
      favourites: (state) => state.favourites,
    }),
  },
};
</script>

<style></style>
