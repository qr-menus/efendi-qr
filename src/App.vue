<template>
  <div id="app">
    <div>
      <nav class="sticky top-0 bg-white">
        <div class="flex items-center px-4 mx-auto border-b max-w-7xl">
          <div class="relative w-full rounded-md">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img class="w-16 h-16" src="./assets/logo.svg" alt="" />
                <button></button>
                <!-- <div>
                  <h6 class="text-sm font-medium">
                    <span class="font-bold text-primary">E1 -</span> (71)
                    233-15-02
                  </h6>
                  <h6 class="text-sm font-medium">
                    <span class="font-bold text-primary">E2 -</span> (95)
                    177-09-93
                  </h6>
                </div> -->
              </div>
              <div>
                <select
                  :value="$store.state.locale"
                  name="language"
                  class="block py-1 pl-4 text-base bg-gray-100 border-none rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  @change="changeLocale"
                >
                  <option
                    v-for="lang in langOptions"
                    :key="lang.text"
                    :value="lang.value"
                  >
                    {{ lang.text }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <scrollactive
            ref="scrollContainer"
            active-class="active"
            :offset="130"
            class="flex items-center px-4 py-2 mx-auto space-x-2 overflow-x-auto max-w-7xl my-nav"
            @itemchanged="onItemChanged"
          >
            <a
              :ref="`link-${key}`"
              v-for="(item, key) in categories"
              :key="item.name_ru"
              :href="`#${key}`"
              class="flex-shrink-0 px-3 py-2 font-medium leading-4 rounded-full scrollactive-item"
            >
              {{ item[$options.filters.locale("name")] }}
            </a>
          </scrollactive>
        </div>
      </nav>
      <div
        v-for="(category, key) in categories"
        :key="key"
        :id="key"
        class="px-4 pb-4 mx-auto mb-4 max-w-7xl"
      >
        <h2 class="my-3 text-xl font-black text-left">
          {{ category[$options.filters.locale("name")] }}
        </h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8"
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
  </div>
</template>
<script>
import FoodCard from "./components/FoodCard.vue";
// import FavouriteItem from "./components/FavouriteItem.vue";
import { mapState } from "vuex";

export default {
  components: {
    FoodCard,
    // FavouriteItem,
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories,
      locale: (state) => state.locale,
    }),
    getField() {
      return (field) => {
        const obj = this.collection[this.$options.filters.locale(field)];
        return obj && obj.toLowerCase();
      };
    },
  },
  data() {
    return {
      searchQuery: "",
      langOptions: [
        { text: "Tr/Ru", value: "ru" },
        { text: "Tr/En", value: "en" },
      ],
    };
  },
  methods: {
    changeLocale(event) {
      this.$store.commit("setLocale", event.target.value);
    },
    onItemChanged(e, curr, lastActive) {
      if (e) {
        const categories = Object.keys(this.categories)
          .map((key, index) => ({
            [key]: index,
          }))
          .reduce((prev, curr) => {
            return { ...prev, ...curr };
          }, {});

        const currCategory = curr.href.split("#")[1];
        const lastActiveCategory = lastActive.href.split("#")[1];

        if (categories[currCategory] > categories[lastActiveCategory]) {
          this.$refs["scrollContainer"].$el.scrollLeft += curr.offsetWidth;
        } else {
          this.$refs["scrollContainer"].$el.scrollLeft -= curr.offsetWidth;
        }
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      const firstLinkArr = this.$refs[
        `link-${Object.keys(this.categories)[0]}`
      ];
      firstLinkArr[0].click();
    });
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.active {
  @apply bg-primary;
  @apply text-white;
}
</style>
