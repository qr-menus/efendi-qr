<template>
  <div id="app">
    <div>
      <nav class="sticky top-0 bg-white">
        <div class="flex items-center px-4 mx-auto border-b max-w-7xl">
          <div class="relative w-full rounded-md">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img class="w-16 h-16" src="./assets/logo.svg" alt="" />
              </div>
              <div class="flex items-center space-x-2">
                <AboutUs />
                <LanguageDropdown :items="langOptions">
                  <template #trigger="{ click }">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                      @click.stop="click"
                    >
                      {{
                        langOptions.find((item) => item.value === locale).text
                      }}
                      <!-- Heroicon name: solid/chevron-down -->
                      <svg
                        class="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </template>
                </LanguageDropdown>
              </div>
            </div>
          </div>
        </div>
        <div>
          <scrollactive
            ref="scrollContainer"
            active-class="active"
            style="scroll-behavior: smooth; transition-duration: 0.5s"
            :offset="120"
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
        class="px-4 pt-3 pb-4 mx-auto mb-4 max-w-7xl"
      >
        <h2 class="mb-3 text-xl font-black text-left">
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
import LanguageDropdown from "./components/LanguageDropdown.vue";
import FoodCard from "./components/FoodCard.vue";
import AboutUs from "./components/AboutUs.vue";
import FoodCart from "./components/FoodCart.vue";
import { mapState } from "vuex";

export default {
  components: {
    LanguageDropdown,
    FoodCard,
    AboutUs,
    FoodCart,
  },
  computed: {
    ...mapState({
      favourites: (state) => state.favourites,
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
      favouritesOn: false,
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

        if (curr && lastActive) {
          const currCategory = curr.href.split("#")[1];
          const lastActiveCategory = lastActive.href.split("#")[1];

          if (categories[currCategory] > categories[lastActiveCategory]) {
            this.$refs["scrollContainer"].$el.scrollLeft += curr.offsetWidth;
          } else {
            this.$refs["scrollContainer"].$el.scrollLeft -= curr.offsetWidth;
          }
        }
      }
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   const firstLinkArr = this.$refs[
    //     `link-${Object.keys(this.categories)[0]}`
    //   ];
    //   firstLinkArr[0].click();
    // });
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
