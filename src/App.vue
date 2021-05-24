<template>
  <div id="app">
    <div>
      <nav class="sticky top-0 z-10 bg-white">
        <Topbar />
        <Searchbar :searchQuery.sync="searchQuery" />
        <FoodCategories :categories="filtered" />
      </nav>
      <div
        v-for="(category, key) in filtered"
        :key="category.id"
        :id="key"
        class="px-4 pt-3 pb-4 mx-auto mb-4 max-w-7xl"
      >
        <h2 class="mb-3 text-xl font-black text-left">
          {{ category[$options.filters.locale("name")] }}
        </h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8"
        >
          <FoodCard
            v-for="(product, $productIndex) in category.products"
            :key="`product-${$productIndex}`"
            :category="key"
            :id="$productIndex + 1"
            :product="product"
          />
        </div>
      </div>
    </div>
    <div class="py-4 text-center border-t">
      Сделано с любовью
      <a
        href="http://qrmenus.uz/"
        target="_blank"
        class="font-bold text-primary"
        >qrmenus.uz</a
      >
    </div>

    <FoodCart v-if="favouritesOn && favourites.length" />
  </div>
</template>

<script>
import Topbar from "./components/core/Topbar";
import Searchbar from "./components/core/Searchbar";
import FoodCategories from "./components/FoodCategories";
import FoodCard from "./components/FoodCard";

import FoodCart from "./components/FoodCart";
import { mapState } from "vuex";

export default {
  components: {
    Topbar,
    Searchbar,
    FoodCategories,
    FoodCard,

    FoodCart,
  },
  computed: {
    ...mapState({
      favourites: (state) => state.favourites,
      categories: (state) => state.categories,
      locale: (state) => state.locale,
      favouritesOn: (state) => state.favouritesOn,
    }),
    filtered() {
      const entries = Object.entries(this.categories)
        .map(([key, category]) => {
          const products = category.products.filter((product) => {
            const { name_en, name_ru, name_tr } = product;
            const productNamesJoined = [name_tr, name_en, name_ru]
              .filter((item) => !!item)
              .map((item) => item.toLowerCase())
              .join(",");

            return productNamesJoined.includes(this.searchQuery.toLowerCase());
          });
          const withFilteredProducts = {
            ...category,
            products,
          };

          return [key, withFilteredProducts];
        })
        .filter(([, category]) => category.products.length);
      // console.log(entries);
      return Object.fromEntries(entries);
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {},
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} /* TODO: refactor */

.active {
  @apply bg-primary;
  @apply text-white;
}
</style>
