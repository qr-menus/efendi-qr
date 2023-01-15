<template>
  <div id="app">
    <div>
      <nav class="sticky top-0 z-10 bg-white">
        <Topbar />
        <FoodCategories :categories="tempFiltered" />
      </nav>
      <Searchbar :searchQuery.sync="searchQuery" />
      <div
        v-for="(category, key) in tempFiltered"
        :key="category.id"
        :id="category.name.en"
        class="px-4 pt-3 pb-4 mx-auto mb-4 max-w-7xl"
      >
        <h2 class="mb-3 text-xl font-black text-left">
          {{ category.name[$options.filters.locale()] }}
        </h2>
        <div
          v-if="verticalCard"
          class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8"
        >
          <FoodCardVertical
            v-for="(product, $productIndex) in category.products"
            :key="`product-${$productIndex}`"
            :category="key"
            :id="$productIndex + 1"
            :product="product"
          />
        </div>
        <div v-else>
          <FoodCardHorizontal
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
import FoodCardVertical from "./components/FoodCardVertical";
import FoodCardHorizontal from "./components/FoodCardHorizontal";

import FoodCart from "./components/FoodCart";
import { mapState } from "vuex";

export default {
  components: {
    Topbar,
    Searchbar,
    FoodCategories,
    FoodCardVertical,
    FoodCardHorizontal,
    FoodCart,
  },
  computed: {
    ...mapState({
      favourites: (state) => state.favourites,
      locale: (state) => state.locale,
      favouritesOn: (state) => state.favouritesOn,
      verticalCard: (state) => state.verticalCard,
      favicon: (state) => state.favicon,
      tempCategories: (state) => state.tempCategories,
    }),
    tempFiltered(){
      const entries = Object.entries(this.tempCategories).map(([key, categories])=>{
        const products = categories.products.filter(product => {
          const {en, ru} = product.name
          const productNamesJoined = [en, ru].filter(item => !!item).map(item => item.toLowerCase()).join(",");
          return productNamesJoined.includes(this.searchQuery.toLowerCase());
        });

        const withFilteredProducts = {
          ...categories,
          products,
        };

        return [key, withFilteredProducts];
      }).filter(([,categories]) => categories.products.length);

      return Object.fromEntries(entries)
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  created() {
    const favIcon = document.getElementById("favicon")
    favIcon.href = this.favicon 
    // console.log('tempFiltered: ',this.tempFiltered)
  },
};
</script>

<style lang="postcss">
#app {
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} /* TODO: refactor */

.one-line-text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
